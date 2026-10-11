import { dots, path, random, type Point } from './geometry';

const W = 1000;
const H = 640;

// A peak with a ripple across it, over the unit disc.
const z = (x: number, y: number) => Math.exp(-3 * (x * x + y * y)) + 0.15 * Math.cos(5 * x) * Math.exp(-(x * x + y * y));

// Oblique projection: turn the disc, tip it back, lift by height.
const TURN = (-35 * Math.PI) / 180;
const project = (x: number, y: number, h = z(x, y)): Point => {
    const u = x * Math.cos(TURN) - y * Math.sin(TURN);
    const v = x * Math.sin(TURN) + y * Math.cos(TURN);
    return [620 + 330 * u, 440 + 125 * v - 300 * h];
};

const LEVEL = 0.5; // the level set printed in rose
const LIGHT = (() => {
    const l = [-0.6, -0.45, 0.65];
    const n = Math.hypot(...l);
    return l.map((c) => c / n);
})();

// Stipple: scatter candidates over the disc, keep each with a probability that grows as the surface turns
// away from the light. Points near the level set go to the rose drum instead.
const { purple, rose } = (() => {
    const rand = random(7);
    const purple: Point[] = [];
    const rose: Point[] = [];
    const e = 1e-3;
    for (let n = 0; n < 18000; n++) {
        const r = Math.sqrt(rand());
        const t = rand() * 2 * Math.PI;
        const x = r * Math.cos(t);
        const y = r * Math.sin(t);
        const h = z(x, y);
        const zx = (z(x + e, y) - h) / e;
        const zy = (z(x, y + e) - h) / e;
        const shade = Math.max(0, (-zx * LIGHT[0] - zy * LIGHT[1] + LIGHT[2]) / Math.hypot(zx, zy, 1));
        const p = project(x, y, h);
        if (Math.abs(h - LEVEL) < 0.045) {
            rose.push(p);
        } else if (rand() < 0.05 + 0.75 * Math.pow(1 - shade, 1.6)) {
            purple.push(p);
        }
    }
    return { purple, rose };
})();

const meridians = Array.from({ length: 40 }, (_, i) => {
    const t = (i / 40) * 2 * Math.PI;
    return Array.from({ length: 41 }, (_, j) => project((j / 40) * Math.cos(t), (j / 40) * Math.sin(t)));
});

const parallels = [0.25, 0.5, 0.75, 1].map((r) =>
    Array.from({ length: 121 }, (_, i) => {
        const t = (i / 120) * 2 * Math.PI;
        return project(r * Math.cos(t), r * Math.sin(t));
    }),
);

// Two straight rules: the vertical axis through the summit, and a sight line from the rim through it.
// The leftmost point of the rose band on the page, where its label goes.
const bandEnd = Array.from({ length: 360 }, (_, i) => {
    const t = (i / 360) * 2 * Math.PI;
    let r = 0;
    while (r < 1 && z(r * Math.cos(t), r * Math.sin(t)) > LEVEL) r += 0.005;
    return project(r * Math.cos(t), r * Math.sin(t));
}).reduce((a, b) => (b[0] < a[0] ? b : a));

const base = project(0, 0, 0);
const summit = project(0, 0);
const rim = project(Math.cos(2.6), Math.sin(2.6));
const sight: Point = [rim[0] + (summit[0] - rim[0]) * 1.35, rim[1] + (summit[1] - rim[1]) * 1.35];

export default function StipplePlate() {
    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="Generated figure: a stippled surface rising to a peak, with one level set printed in rose."
            className="h-full w-full"
        >
            <g className="mix-blend-multiply fill-none stroke-ink-purple">
                {meridians.map((m, i) => (
                    <path key={i} d={path(m)} strokeWidth={0.5} strokeOpacity={0.35} vectorEffect="non-scaling-stroke" />
                ))}
                {parallels.map((p, i) => (
                    <path key={i} d={path(p)} strokeWidth={0.6} strokeOpacity={0.55} vectorEffect="non-scaling-stroke" />
                ))}
            </g>

            <g className="mix-blend-multiply fill-none" strokeLinecap="round">
                <path d={dots(purple)} strokeWidth={2.1} className="stroke-ink-purple" />
                <path d={dots(rose)} strokeWidth={2.8} className="stroke-ink-rose" />
            </g>

            <g className="stroke-ink" strokeWidth={1.1}>
                <line x1={base[0]} y1={base[1]} x2={summit[0]} y2={summit[1] - 60} vectorEffect="non-scaling-stroke" />
                <line x1={rim[0]} y1={rim[1]} x2={sight[0]} y2={sight[1]} vectorEffect="non-scaling-stroke" />
            </g>

            <g className="fill-ink font-mono svg-halo" fontSize={10}>
                <circle cx={summit[0]} cy={summit[1]} r={3} />
                <text x={summit[0] + 10} y={summit[1] - 4}>z = {z(0, 0).toFixed(2)}</text>
                <text x={base[0] + 8} y={base[1] + 14}>0</text>
                <text x={rim[0] - 8} y={rim[1] + 16} textAnchor="end">r = 1</text>
            </g>

            {/* Typewritten notes knocked out of the linework, quoting the projects below */}
            <g className="hidden sm:inline font-mono" fontSize={12.5}>
                <rect x={706} y={196} width={268} height={70} className="fill-paper" fillOpacity={0.92} />
                <text x={714} y={216} className="fill-ink">
                    <tspan x={714}>annualized Sharpe ratio of 1.14,</tspan>
                    <tspan x={714} dy={16}>at roughly half the drawdown of</tspan>
                    <tspan x={714} dy={16}>a passive S&amp;P 500 benchmark.</tspan>
                </text>
                <rect x={60} y={500} width={262} height={54} className="fill-paper" fillOpacity={0.92} />
                <text x={68} y={520} className="fill-ink">
                    <tspan x={68}>a 30% reduction in cluster</tspan>
                    <tspan x={68} dy={16}>convergence time.</tspan>
                </text>
                <text x={bandEnd[0] - 12} y={bandEnd[1] + 4} textAnchor="end" className="fill-ink-rose" fontSize={11}>
                    level set z = {LEVEL} →
                </text>
            </g>
        </svg>
    );
}
