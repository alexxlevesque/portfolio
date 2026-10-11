import { path, random, type Point } from './geometry';

// A landscape sheet: Brownian motion across the top, the option and Itô's table beneath.
const W = 1000;
const H = 780;
const MISREGISTER = 1.5; // how far the purple drum lands from the others

// ── Upper figure: Brownian motion on [0, T], T = 1 ──────────────────────────────────────────────
const X0 = 60; // t = 0
const XT = 800; // t = T
const ZERO = 385; // B = 0
const tx = (t: number) => X0 + (XT - X0) * t;
const by = (b: number) => ZERO - 92 * b;
const A = 1.2; // the level a
const aY = by(A);

function gaussian(rand: () => number) {
    return Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
}

const STEPS = 700;
function brownian(seed: number) {
    const rand = random(seed);
    const b = [0];
    for (let i = 1; i <= STEPS; i++) b.push(b[i - 1] + Math.sqrt(1 / STEPS) * gaussian(rand));
    return b;
}

// The first seed whose path reaches a partway along and finishes well below it, with the reflection
// 2a − Bₜ staying on the sheet.
const sample = (() => {
    for (let seed = 1; seed < 5000; seed++) {
        const b = brownian(seed);
        const k = b.findIndex((v) => v >= A);
        if (k < 0 || k < 0.3 * STEPS || k > 0.5 * STEPS) continue;
        const after = b.slice(k);
        if (b[STEPS] > A - 0.5 || 2 * A - Math.min(...after) > 2.15 || Math.min(...b) < -2) continue;
        return { b, k };
    }
    throw new Error('no Brownian sample met the plate constraints');
})();

const hitT = (sample.k - 1 + (A - sample.b[sample.k - 1]) / (sample.b[sample.k] - sample.b[sample.k - 1])) / STEPS;
const hit: Point = [tx(hitT), aY];
const pathBefore: Point[] = [...sample.b.slice(0, sample.k).map((v, i): Point => [tx(i / STEPS), by(v)]), hit];
const pathAfter: Point[] = [hit, ...sample.b.slice(sample.k).map((v, i): Point => [tx((sample.k + i) / STEPS), by(v)])];
const reflected: Point[] = [hit, ...sample.b.slice(sample.k).map((v, i): Point => [tx((sample.k + i) / STEPS), by(2 * A - v)])];

// ±c√t envelopes, sampled more densely near t = 0 where √t is steep.
const envelope = (c: number) =>
    Array.from({ length: 121 }, (_, i): Point => {
        const t = (i / 120) ** 2;
        return [tx(t), by(c * Math.sqrt(t))];
    });
const band = (c: number) => `${path([...envelope(c), ...envelope(-c).reverse()])}Z`;

const pdf = (b: number, t: number) => Math.exp((-b * b) / (2 * t)) / Math.sqrt(2 * Math.PI * t);

// Violins: the law of Bₜ at a few times, as outlines hatched across.
const violins = [0.25, 0.5, 0.75]
    .map((t) => {
        const span = 2.4 * Math.sqrt(t);
        const levels = Array.from({ length: 61 }, (_, i) => -span + (2 * span * i) / 60);
        const half = (b: number) => 55 * pdf(b, t);
        const outline = path([
            ...levels.map((b): Point => [tx(t) + half(b), by(b)]),
            ...[...levels].reverse().map((b): Point => [tx(t) - half(b), by(b)]),
        ]);
        const hatching = levels
            .filter((_, i) => i % 3 === 0)
            .map((b) => path([[tx(t) - half(b), by(b)], [tx(t) + half(b), by(b)]]))
            .join('');
        return outline + hatching;
    })
    .join('');

// The law of B_T, standing on the line t = T.
const density = `${path(
    Array.from({ length: 81 }, (_, i): Point => {
        const b = -3.2 + (6.4 * i) / 80;
        return [XT + 260 * pdf(b, 1), by(b)];
    }),
)}L${XT} ${by(-3.2)}L${XT} ${by(3.2)}Z`;

// A simple random walk scaled by 1/√n, the discrete picture behind Donsker's theorem.
const walk = (() => {
    const rand = random(3);
    const n = 20;
    let s = 0;
    const points: Point[] = [[tx(0), by(0)]];
    for (let k = 1; k <= n; k++) {
        points.push([tx(k / n), by(s / Math.sqrt(n))]);
        s += rand() < 0.5 ? 1 : -1;
        points.push([tx(k / n), by(s / Math.sqrt(n))]);
    }
    return points;
})();

// The filtration grows: ticks lengthen with t.
const filtrationTicks = Array.from({ length: 43 }, (_, i) => {
    const t = i / 42;
    return `M${tx(t)} 150V${(150 - 3 - 10 * t).toFixed(1)}`;
}).join('');

// ── Lower figure: a call option under Black–Scholes, r = 0 ─────────────────────────────────────
const K = 1;
const SIGMA = 0.5;
const AXIS = 750;
const sx = (s: number) => 60 + 290 * s;
const vy = (v: number) => AXIS - 110 * v;

// Abramowitz & Stegun 7.1.26; plenty for a drawing.
function erf(x: number) {
    const t = 1 / (1 + 0.3275911 * Math.abs(x));
    const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return x < 0 ? -y : y;
}
const normalCdf = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2));
const d1 = (s: number, tau: number) => (Math.log(s / K) + (SIGMA * SIGMA * tau) / 2) / (SIGMA * Math.sqrt(tau));
const callPrice = (s: number, tau: number) => s * normalCdf(d1(s, tau)) - K * normalCdf(d1(s, tau) - SIGMA * Math.sqrt(tau));
const gammaOf = (s: number, tau: number) => Math.exp(-(d1(s, tau) ** 2) / 2) / Math.sqrt(2 * Math.PI) / (s * SIGMA * Math.sqrt(tau));

const spots = Array.from({ length: 99 }, (_, i) => 0.02 + (1.98 * i) / 98);
const calls = [1, 0.5, 0.25, 0.1].map((tau) => path(spots.map((s): Point => [sx(s), vy(callPrice(s, tau))]))).join('');
const gamma = `${path([[sx(0.02), AXIS], ...spots.map((s): Point => [sx(s), AXIS - 48 * gammaOf(s, 0.25)]), [sx(2), AXIS]])}Z`;
const payoff = path([[sx(0), AXIS], [sx(K), AXIS], [sx(2), vy(2 - K)]]);

export default function BrownianPlate() {
    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="Generated figure: a Brownian path reflected after it first hits a level, inside yellow bands of ±√t and ±2√t, above a chart of call option prices converging to their payoff, and Itô's multiplication table."
            className="h-full w-full"
        >
            <defs>
                <filter id="bm-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="17" result="n" />
                    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -3 2.1" result="m" />
                    <feComposite in="SourceGraphic" in2="m" operator="in" />
                </filter>
                <pattern id="bm-dots" width="5" height="5" patternUnits="userSpaceOnUse">
                    <circle cx="2.5" cy="2.5" r="1.3" className="fill-ink-rose" />
                </pattern>
                <clipPath id="bm-plot">
                    <rect x="40" y="160" width="950" height="430" />
                </clipPath>
                <path id="bm-env-upper" d={path(envelope(1))} />
                <path id="bm-env-lower" d={path(envelope(-2))} />
            </defs>

            <path d={filtrationTicks} fill="none" className="stroke-ink" strokeWidth={0.8} opacity={0.7} />
            <text x={XT + 6} y={147} fontSize={10} className="fill-ink font-mono">𝓕ₜ ↑</text>

            <g clipPath="url(#bm-plot)">
                <g className="mix-blend-multiply">
                    <path d={band(2)} className="fill-ink-yellow" opacity={0.45} filter="url(#bm-grain)" />
                    <path d={band(1)} className="fill-ink-yellow" opacity={0.8} filter="url(#bm-grain)" />
                </g>
                <g className="mix-blend-multiply" transform={`translate(${MISREGISTER} ${MISREGISTER})`}>
                    <path d={violins} fill="none" className="stroke-ink-purple" strokeWidth={0.7} opacity={0.5} />
                    <path d={density} fill="url(#bm-dots)" />
                </g>
                <path d={path(walk)} fill="none" className="stroke-ink-rose" strokeWidth={1} opacity={0.8} />
                <path d={path(reflected)} fill="none" className="stroke-ink" strokeWidth={1} strokeDasharray="3 3" />
                <path d={path(pathBefore)} fill="none" className="stroke-ink-rose mix-blend-multiply" strokeWidth={2.6} strokeLinejoin="round" />
                <path d={path(pathAfter)} fill="none" className="stroke-ink-rose mix-blend-multiply" strokeWidth={1.2} opacity={0.8} />
            </g>

            <g className="stroke-ink">
                <line x1={X0} y1={aY} x2={XT} y2={aY} strokeWidth={1.4} />
                <line x1={X0} y1={ZERO} x2={XT} y2={ZERO} strokeWidth={0.6} strokeDasharray="2 3" />
                <line x1={XT} y1={165} x2={XT} y2={585} strokeWidth={1.2} />
            </g>
            <circle cx={hit[0]} cy={aY} r={5.5} className="fill-ink" />
            <circle cx={X0} cy={ZERO} r={4} className="fill-ink" />

            <g fontSize={10.5} className="fill-ink font-mono svg-halo">
                <text x={X0 - 8} y={ZERO + 4} textAnchor="end">0</text>
                <text x={X0 - 8} y={aY + 4} textAnchor="end">a</text>
                <text x={hit[0] + 10} y={aY - 12} fontWeight={700}>τₐ = inf{'{'}t : Bₜ = a{'}'}</text>
                <text x={XT + 6} y={604}>t = T</text>
                <text x={XT + 112} y={ZERO - 8}>Bₜ ~ N(0, T)</text>
                <text x={X0} y={604} className="fill-ink-rose">dashed: 2a − Bₜ after τₐ ⇒ P(maxₛ≤ₜ Bₛ ≥ a) = 2P(Bₜ ≥ a)</text>
            </g>
            <g fontSize={10} className="font-mono svg-halo">
                <text className="fill-ink-rose">
                    <textPath href="#bm-env-upper" startOffset="22%">±√t · Var Bₜ = t · quadratic variation [B]ₜ = t</textPath>
                </text>
                <text className="fill-ink-purple">
                    <textPath href="#bm-env-lower" startOffset="18%">Bₜ,  Bₜ² − t,  exp(θBₜ − ½θ²t) are martingales</textPath>
                </text>
            </g>

            <path d={gamma} className="fill-ink-yellow mix-blend-multiply" opacity={0.85} filter="url(#bm-grain)" />
            <path d={calls} fill="none" className="stroke-ink-purple" strokeWidth={1.2} transform={`translate(${MISREGISTER} ${MISREGISTER})`} />
            <path d={payoff} fill="none" className="stroke-ink-rose mix-blend-multiply" strokeWidth={3} />
            <line x1={sx(0)} y1={AXIS} x2={sx(2)} y2={AXIS} className="stroke-ink" strokeWidth={1.2} />
            <line x1={sx(K)} y1={630} x2={sx(K)} y2={AXIS + 6} className="stroke-ink" strokeWidth={0.7} strokeDasharray="2 3" />
            <g fontSize={10} className="fill-ink font-mono svg-halo">
                <text x={sx(K)} y={AXIS + 16} textAnchor="middle">K</text>
                <text x={sx(0)} y={AXIS + 16}>S</text>
                <text x={70} y={632} fontWeight={700} fontSize={10.5}>C(S, τ) → (S − K)⁺ as τ ↓ 0</text>
                <text x={70} y={646}>τ = 1, ½, ¼, 1/10 · Γ in yellow</text>
            </g>

            {/* Itô's multiplication table, drawn on its own grid and set into the lower right corner */}
            <g transform="translate(385 30) scale(0.74)">
                <text x={604} y={822} fontSize={13} letterSpacing={1.6} fontWeight={700} className="fill-ink-rose font-mono">ITÔ&apos;S TABLE</text>
                <g className="stroke-ink">
                    <line x1={604} y1={868} x2={790} y2={868} strokeWidth={1} />
                    <line x1={654} y1={836} x2={654} y2={996} strokeWidth={1} />
                    <line x1={604} y1={932} x2={790} y2={932} strokeWidth={0.6} strokeDasharray="2 3" />
                    <line x1={722} y1={836} x2={722} y2={996} strokeWidth={0.6} strokeDasharray="2 3" />
                </g>
                <rect x={728} y={940} width={56} height={50} className="fill-ink-rose mix-blend-multiply" opacity={0.35} filter="url(#bm-grain)" />
                <g fontSize={26} textAnchor="middle" className="fill-ink font-serif italic">
                    <text x={629} y={860}>×</text>
                    <text x={688} y={860}>dt</text>
                    <text x={756} y={860}>dB</text>
                    <text x={629} y={910}>dt</text>
                    <text x={688} y={910}>0</text>
                    <text x={756} y={910}>0</text>
                    <text x={629} y={974}>dB</text>
                    <text x={688} y={974}>0</text>
                    <text x={756} y={974}>dt</text>
                </g>
            </g>
        </svg>
    );
}
