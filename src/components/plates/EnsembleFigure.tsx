import { gaussian, path, random, type Point } from './geometry';
import GrainFilter from './GrainFilter';

// A schematic of the RL ensemble: three agents and their average riding through a market drawdown,
// above the allocation across nine ETFs shifting as conditions change. The series are simulated.
const W = 400;
const H = 300;
const DAYS = 160;
const X0 = 18;
const X1 = 300;
const tx = (i: number) => X0 + ((X1 - X0) * i) / DAYS;

// How deep into the drawdown we are, 0 to 1, rising and falling smoothly around days 70–100.
const stress = (i: number) => Math.exp(-(((i - 86) / 16) ** 2));

const rand = random(21);
const market = Array.from({ length: DAYS }, (_, i) => 0.0016 - 0.014 * stress(i) + 0.01 * gaussian(rand));

// Each agent cuts its market exposure after a bad stretch, with its own noise.
const agents = ['PPO', 'A2C', 'TD3'].map((name, k) => {
    const noise = random(40 + k);
    let exposure = 1;
    const returns = market.map((m, i) => {
        const recent = market.slice(Math.max(0, i - 8), i).reduce((a, b) => a + b, 0);
        exposure += (0.2 + 0.1 * k) * ((recent < -0.03 ? 0.3 : 1) - exposure);
        return exposure * m + 0.0004 + 0.005 * gaussian(noise);
    });
    return { name, returns };
});
const ensemble = market.map((_, i) => agents.reduce((sum, a) => sum + a.returns[i], 0) / agents.length);

const equity = (returns: number[]) => returns.reduce((acc, r) => [...acc, acc[acc.length - 1] * (1 + r)], [1]);
const curves = {
    market: equity(market),
    ensemble: equity(ensemble),
    agents: agents.map((a) => ({ name: a.name, values: equity(a.returns) })),
};
const all = [curves.market, curves.ensemble, ...curves.agents.map((a) => a.values)].flat();
const lo = Math.min(...all);
const hi = Math.max(...all);
const vy = (v: number) => 176 - (146 * (v - lo)) / (hi - lo);
const line = (values: number[]) => path(values.map((v, i): Point => [tx(i), vy(v)]));

// Right-hand labels, nudged apart so none overlap.
const labels = [
    { text: 'SPY', y: vy(curves.market[DAYS]), className: 'fill-ink' },
    { text: 'ensemble', y: vy(curves.ensemble[DAYS]), className: 'fill-ink-rose font-bold' },
    {
        text: curves.agents.map((a) => a.name).join('·'),
        y: curves.agents.reduce((sum, a) => sum + vy(a.values[DAYS]), 0) / curves.agents.length,
        className: 'fill-ink-purple',
    },
]
    .sort((a, b) => a.y - b.y)
    .reduce<{ text: string; y: number; className: string }[]>((placed, l) => {
        const prev = placed[placed.length - 1];
        return [...placed, { ...l, y: prev ? Math.max(l.y, prev.y + 12) : l.y }];
    }, []);

// Allocation across nine ETFs: a softmax of slow waves, tilting toward the first two during the drawdown.
const ETFS = 9;
const phase = random(8);
const waves = Array.from({ length: ETFS }, () => ({ f: 0.6 + 1.6 * phase(), p: phase(), a: 0.5 + 0.6 * phase() }));
const weights = Array.from({ length: DAYS + 1 }, (_, i) => {
    const logits = waves.map(({ f, p, a }, k) => a * Math.sin(2 * Math.PI * (f * (i / DAYS) + p)) + stress(i) * (k < 2 ? 2.4 : -0.4));
    const e = logits.map(Math.exp);
    const total = e.reduce((a, b) => a + b, 0);
    return e.map((v) => v / total);
});
const BASE = 288;
const DEPTH = 86;
const layers = Array.from({ length: ETFS }, (_, k) => {
    const lower = weights.map((w, i): Point => [tx(i), BASE - DEPTH * w.slice(0, k).reduce((a, b) => a + b, 0)]);
    const upper = weights.map((w, i): Point => [tx(i), BASE - DEPTH * w.slice(0, k + 1).reduce((a, b) => a + b, 0)]);
    return { area: `${path([...lower, ...[...upper].reverse()])}Z`, edge: path(upper) };
});
const INKS = ['fill-ink-yellow', 'fill-ink-rose', 'fill-ink-purple'];
const OPACITY = [0.85, 0.5, 0.32];

export default function EnsembleFigure() {
    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="Illustration: equity curves for PPO, A2C and TD3 agents and their ensemble against SPY through a drawdown, above shifting allocations across nine ETFs."
            className="h-full w-full"
        >
            <defs>
                <GrainFilter id="ens-grain" seed={5} />
            </defs>

            <g className="mix-blend-multiply">
                {layers.map(({ area }, k) => (
                    <path key={k} d={area} className={INKS[k % 3]} opacity={OPACITY[Math.floor(k / 3)]} filter="url(#ens-grain)" />
                ))}
            </g>
            <g fill="none" className="stroke-ink" strokeWidth={0.5} opacity={0.45}>
                {layers.map(({ edge }, k) => (
                    <path key={k} d={edge} />
                ))}
            </g>

            {/* The drawdown, shaded where the market is under stress */}
            <rect x={tx(70)} y={22} width={tx(102) - tx(70)} height={160} className="fill-ink-yellow mix-blend-multiply" opacity={0.35} filter="url(#ens-grain)" />

            <line x1={X0} y1={vy(1)} x2={X1} y2={vy(1)} className="stroke-ink" strokeWidth={0.6} strokeDasharray="2 3" />
            <path d={line(curves.market)} fill="none" className="stroke-ink" strokeWidth={1} strokeDasharray="3 2" />
            <g className="mix-blend-multiply" transform="translate(1.2 1.2)">
                {curves.agents.map(({ name, values }) => (
                    <path key={name} d={line(values)} fill="none" className="stroke-ink-purple" strokeWidth={0.8} opacity={0.75} />
                ))}
            </g>
            <path d={line(curves.ensemble)} fill="none" className="stroke-ink-rose mix-blend-multiply" strokeWidth={2.4} strokeLinejoin="round" />
            <line x1={X1} y1={20} x2={X1} y2={BASE} className="stroke-ink" strokeWidth={0.8} />

            <g fontSize={11} className="font-mono svg-halo">
                {labels.map(({ text, y, className }) => (
                    <text key={text} x={X1 + 6} y={y + 4} className={className}>
                        {text}
                    </text>
                ))}
                <text x={X1 + 6} y={BASE - DEPTH / 2 + 4} className="fill-ink">9 ETFs</text>
            </g>
        </svg>
    );
}
