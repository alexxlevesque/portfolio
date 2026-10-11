import { path, type Point } from './geometry';
import YellowGlow from './YellowGlow';

const W = 1000;
const H = 640;
// The pole sits on the sheet; its partner lies far below it, off the page.
const F1: Point = [600, 250];
const F2: Point = [600, 1150];
const MID = (F1[1] + F2[1]) / 2;

const onSheet = ([x, y]: Point, margin = 30) => x > -margin && x < W + margin && y > -margin && y < H + margin;

// Circles of Apollonius, |P − F1| = k·|P − F2|, nesting around the pole as k shrinks.
const circles = Array.from({ length: 28 }, (_, i) => {
    const k = 0.006 * Math.pow(0.62 / 0.006, i / 27);
    const k2 = k * k;
    const cy = (F1[1] - k2 * F2[1]) / (1 - k2);
    const r = (k * (F2[1] - F1[1])) / (1 - k2);
    return { k, cy, r };
});

// The orthogonal family: circles through both F1 and F2, traced from the pole after leaving it at angle `a`
// from straight down.
function fieldLine(a: number): Point[] {
    const s = (F1[1] - MID) / Math.sin(a);
    const c: Point = [F1[0] + s * Math.cos(a), MID];
    const r = Math.abs(s);
    // Walk round the circle in whichever sense starts out heading along (sin a, cos a).
    const sense = Math.sign((c[1] - F1[1]) * Math.sin(a) + (F1[0] - c[0]) * Math.cos(a));
    let theta = Math.atan2(F1[1] - c[1], F1[0] - c[0]);
    const points: Point[] = [F1];
    for (let n = 0; n < 3000; n++) {
        theta += (sense * 4) / r;
        const p: Point = [c[0] + r * Math.cos(theta), c[1] + r * Math.sin(theta)];
        if (!onSheet(p)) break;
        points.push(p);
    }
    return points;
}

const DEG = Math.PI / 180;
const fieldLines = [-1, 1].flatMap((side) =>
    Array.from({ length: 13 }, (_, i) => fieldLine(side * (6 + (80 * i) / 12) * DEG)),
);

// Phrases from the introduction, set along field lines. Left-hand lines are reversed so the type stays upright.
const captions: { line: number; text: string }[] = [
    { line: 9, text: 'applications to finance and decision-making' },
    { line: 5, text: 'statistics' },
    { line: 13 + 6, text: 'machine learning' },
    { line: 13 + 10, text: 'tools that make technical work more efficient' },
];

const circlePath = (cy: number, r: number) =>
    `M${F1[0] - r} ${cy}A${r} ${r} 0 1 1 ${F1[0] + r} ${cy}A${r} ${r} 0 1 1 ${F1[0] - r} ${cy}`;

// Mark where circles cross the axis below the pole, skipping any that would crowd the previous mark.
const axisMarks = circles
    .filter(({ cy, r }) => cy + r > F1[1] + 30 && cy + r < H - 30)
    .reduce<typeof circles>((kept, c) => {
        const last = kept[kept.length - 1];
        return !last || c.cy + c.r - (last.cy + last.r) > 22 ? [...kept, c] : kept;
    }, []);

export default function ApollonianPlate() {
    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="Generated figure: nested circles of Apollonius around a yellow pole, crossed by a fan of curves through the pole."
            className="h-full w-full"
        >
            <YellowGlow id="apollonius" cx={F1[0]} cy={F1[1]} r={290} seed={4} />

            <g className="mix-blend-multiply fill-none stroke-ink-rose" strokeLinecap="round">
                {circles.map(({ cy, r }, i) => (
                    <circle
                        key={i}
                        cx={F1[0]}
                        cy={cy}
                        r={r}
                        strokeWidth={i % 4 === 3 ? 1.3 : 0.7}
                        vectorEffect="non-scaling-stroke"
                    />
                ))}
                {fieldLines.map((line, i) => (
                    <path key={i} d={path(line)} strokeWidth={0.6} strokeOpacity={0.8} vectorEffect="non-scaling-stroke" />
                ))}
            </g>

            <defs>
                {captions.map(({ line }) => {
                    const points = line < 13 ? [...fieldLines[line]].reverse() : fieldLines[line];
                    return <path key={line} id={`apollonius-line-${line}`} d={path(points)} />;
                })}
                <path id="apollonius-circle-a" d={circlePath(circles[16].cy, circles[16].r)} />
                <path id="apollonius-circle-b" d={circlePath(circles[20].cy, circles[20].r)} />
            </defs>

            <g className="fill-ink font-mono svg-halo" fontSize={10} letterSpacing={0.4}>
                {captions.map(({ line, text }) => (
                    <text key={line} dy={-3}>
                        <textPath href={`#apollonius-line-${line}`} startOffset="50%" textAnchor="middle">
                            {text}
                        </textPath>
                    </text>
                ))}
                <text dy={-3} className="fill-ink-rose">
                    <textPath href="#apollonius-circle-a" startOffset="25%" textAnchor="middle">
                        |P − F₁| = {circles[16].k.toFixed(3)} · |P − F₂|
                    </textPath>
                </text>
                <text dy={-3} className="fill-ink-rose">
                    <textPath href="#apollonius-circle-b" startOffset="21%" textAnchor="middle">
                        |P − F₁| = {circles[20].k.toFixed(3)} · |P − F₂|
                    </textPath>
                </text>
            </g>

            {/* The axis through both foci, marked where each circle crosses it */}
            <line x1={F1[0]} y1={F1[1]} x2={F1[0]} y2={H} strokeWidth={1.2} className="stroke-ink" vectorEffect="non-scaling-stroke" />
            <g className="fill-ink svg-halo">
                <circle cx={F1[0]} cy={F1[1]} r={3.5} />
                {axisMarks.map(({ k, cy, r }) => (
                    <g key={k}>
                        <circle cx={F1[0]} cy={cy + r} r={2.6} />
                        <text x={F1[0] + 9} y={cy + r + 3.5} fontSize={9} className="font-mono">
                            k = {k.toFixed(3)}
                        </text>
                    </g>
                ))}
                <g fontSize={10} className="font-mono">
                    <text x={F1[0] + 10} y={F1[1] - 8}>F₁</text>
                    <text x={F1[0] + 10} y={H - 12}>F₂ ↓ {F2[1] - F1[1]} below</text>
                </g>
            </g>
        </svg>
    );
}
