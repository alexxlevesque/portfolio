import { contours, length, path, type Point } from './geometry';
import YellowGlow from './YellowGlow';

const W = 1000;
const H = 640;
const STEP = 5; // sample spacing, in plate units

// Gaussian hills (and one hollow) with a faint ripple. Positions are fractions of the sheet.
const HILLS = [
    { x: 0.66, y: 0.36, a: 1, s: 0.13 },
    { x: 0.3, y: 0.62, a: 0.72, s: 0.1 },
    { x: 0.88, y: 0.78, a: 0.5, s: 0.08 },
    { x: 0.1, y: 0.84, a: 0.42, s: 0.07 },
    { x: 0.52, y: 0.9, a: -0.38, s: 0.09 },
];

function f(px: number, py: number) {
    const u = px / W;
    const v = py / W; // same scale on both axes keeps the hills round
    let value = 0.04 * Math.sin(9 * u) * Math.cos(11 * v);
    for (const { x, y, a, s } of HILLS) {
        const d2 = (u - x) ** 2 + (v - (y * H) / W) ** 2;
        value += a * Math.exp(-d2 / (2 * s * s));
    }
    return value;
}

const nx = W / STEP + 1;
const ny = H / STEP + 1;
const field = new Float64Array(nx * ny);
for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) field[j * nx + i] = f(i * STEP, j * STEP);

const INTERVAL = 0.05;
const levels = Array.from({ length: 27 }, (_, i) => Math.round((-0.3 + i * INTERVAL) * 100) / 100);
const isIndex = (level: number) => Math.abs(level / 0.25 - Math.round(level / 0.25)) < 1e-6;

const lines = levels.flatMap((level) =>
    contours(field, nx, ny, level).map((line) => ({
        level,
        points: line.map(([i, j]): Point => [i * STEP, j * STEP]),
    })),
);

// Each term's course codes run along its own stretch of low contour, kept clear of the plate's title
// (top left) and caption (bottom left).
const clear = ([x, y]: Point) => !(x < 560 && y < 210) && !(x < 600 && y > 560) && x > 20 && x < W - 20 && y > 20 && y < H - 20;
const candidates = lines
    .filter(({ level }) => level > 0 && level <= 0.3)
    .sort((a, b) => length(b.points) - length(a.points));

function findRun(runLength: number, skip: Set<Point[]>) {
    for (const { points } of candidates) {
        if (skip.has(points)) continue;
        for (let start = 0; start < points.length; start += 5) {
            const run: Point[] = [points[start]];
            for (let i = start + 1; i < points.length && length(run) < runLength; i++) run.push(points[i]);
            if (length(run) >= runLength && run.every(clear)) {
                skip.add(points);
                // Type reads left to right, so a run heading left is turned around.
                return run[run.length - 1][0] < run[0][0] ? run.reverse() : run;
            }
        }
    }
    return null;
}

const CHAR_WIDTH = 6.2; // Courier advance at the plate's 9.5-unit type, plus letter spacing
const termLine = ({ name, codes }: { name: string; codes: string[] }) => `${name.toUpperCase()} — ${codes.join(' · ')}`;

// Elevation labels sit on one long stretch of each index contour.
const labelled = lines.filter(({ level, points }) => isIndex(level) && level > 0 && length(points) > 260);

// A transect from A to A′, marked wherever it crosses an index contour.
const A: Point = [80, 575];
const B: Point = [950, 70];
const crossings: { p: Point; level: number }[] = [];
for (let n = 1, prev = f(...A); n <= 600; n++) {
    const p: Point = [A[0] + ((B[0] - A[0]) * n) / 600, A[1] + ((B[1] - A[1]) * n) / 600];
    const cur = f(...p);
    const lo = Math.min(prev, cur);
    const hi = Math.max(prev, cur);
    for (const level of levels) if (isIndex(level) && lo < level && level <= hi) crossings.push({ p, level });
    prev = cur;
}

export default function ContourPlate({ terms }: { terms: { name: string; codes: string[] }[] }) {
    const used = new Set<Point[]>();
    const runs = terms.map((term) => ({ text: termLine(term), run: findRun(termLine(term).length * CHAR_WIDTH + 20, used) }));

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="Generated figure: a contour map of hills and a hollow, with yellow pooled on the two summits and a marked transect."
            className="h-full w-full"
        >
            <YellowGlow id="summit-a" cx={HILLS[0].x * W} cy={HILLS[0].y * H} r={230} seed={2} />
            <YellowGlow id="summit-b" cx={HILLS[1].x * W} cy={HILLS[1].y * H} r={150} seed={9} />

            <g className="mix-blend-multiply fill-none" strokeLinejoin="round">
                {lines.map(({ level, points }, i) => (
                    <path
                        key={i}
                        d={path(points)}
                        className={level < 0 ? 'stroke-ink-purple' : 'stroke-ink-rose'}
                        strokeWidth={isIndex(level) ? 1.3 : 0.6}
                        strokeDasharray={level < 0 ? '3 3' : undefined}
                        vectorEffect="non-scaling-stroke"
                    />
                ))}
            </g>

            <defs>
                {runs.map(({ run }, i) => run && <path key={i} id={`contour-term-${i}`} d={path(run)} />)}
                {labelled.map(({ points }, i) => (
                    <path key={i} id={`contour-label-${i}`} d={path(points)} />
                ))}
            </defs>

            <g className="font-mono svg-halo" fontSize={9.5} letterSpacing={0.5}>
                {runs.map(({ run, text }, i) => run && (
                    <text key={i} dy={-3} className="fill-ink">
                        <textPath href={`#contour-term-${i}`}>{text}</textPath>
                    </text>
                ))}
                {labelled.map(({ level }, i) => (
                    <text key={i} dy={3} className="fill-ink-rose">
                        <textPath href={`#contour-label-${i}`} startOffset="62%">
                            {level.toFixed(2)}
                        </textPath>
                    </text>
                ))}
            </g>

            <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} strokeWidth={1.1} className="stroke-ink" vectorEffect="non-scaling-stroke" />
            <g className="fill-ink font-mono svg-halo" fontSize={9.5}>
                {crossings.map(({ p, level }, i) => (
                    <g key={i}>
                        <circle cx={p[0]} cy={p[1]} r={2.6} />
                        <text x={p[0] + 7} y={p[1] + 12}>{level.toFixed(2)}</text>
                    </g>
                ))}
                <text x={A[0] - 14} y={A[1] + 4} fontSize={12}>A</text>
                <text x={B[0] + 7} y={B[1] + 4} fontSize={12}>A′</text>
                {HILLS.slice(0, 2).map(({ x, y }) => (
                    <g key={x}>
                        <text x={x * W} y={y * H + 4} textAnchor="middle" fontSize={12}>+</text>
                        <text x={x * W - 9} y={y * H - 8} textAnchor="end">{f(x * W, y * H).toFixed(2)}</text>
                    </g>
                ))}
            </g>
        </svg>
    );
}
