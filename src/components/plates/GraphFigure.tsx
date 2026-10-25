import { path, random, type Point } from './geometry';
import YellowGlow from './YellowGlow';

// The second brain as a graph view: eleven books, each ringed by the short idea notes taken from it,
// with a few ideas linked across books. The layout is a seeded force simulation, settled at build time.
const W = 400;
const H = 300;
const MARGIN = 18;

const rand = random(11);
const BOOKS = 11;
type Node = { p: Point; v: Point; book: boolean };
const nodes: Node[] = [];
const edges: [number, number][] = [];
const ideasOf: number[][] = [];

for (let b = 0; b < BOOKS; b++) {
    const angle = (2 * Math.PI * b) / BOOKS;
    const centre: Point = [W / 2 + 110 * Math.cos(angle), H / 2 + 80 * Math.sin(angle)];
    const book = nodes.push({ p: centre, v: [0, 0], book: true }) - 1;
    const ideas: number[] = [];
    const count = 3 + Math.floor(4 * rand());
    for (let k = 0; k < count; k++) {
        const idea = nodes.push({ p: [centre[0] + 20 * (rand() - 0.5), centre[1] + 20 * (rand() - 0.5)], v: [0, 0], book: false }) - 1;
        edges.push([book, idea]);
        ideas.push(idea);
    }
    ideasOf.push(ideas);
}

// Related ideas in other books, the links that make it a graph rather than a list.
const crossLinks: [number, number][] = [];
for (let n = 0; n < 14; n++) {
    const a = Math.floor(BOOKS * rand());
    const b = (a + 1 + Math.floor((BOOKS - 1) * rand())) % BOOKS;
    const pick = (ideas: number[]) => ideas[Math.floor(ideas.length * rand())];
    crossLinks.push([pick(ideasOf[a]), pick(ideasOf[b])]);
}

const springs = [
    ...edges.map(([a, b]) => ({ a, b, rest: 24, k: 0.08 })),
    ...crossLinks.map(([a, b]) => ({ a, b, rest: 70, k: 0.01 })),
];
for (let step = 0; step < 400; step++) {
    const cool = 1 - step / 400;
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].p[0] - nodes[i].p[0];
            const dy = nodes[j].p[1] - nodes[i].p[1];
            const d2 = Math.max(dx * dx + dy * dy, 1);
            const f = 12 / d2;
            nodes[i].v[0] -= dx * f;
            nodes[i].v[1] -= dy * f;
            nodes[j].v[0] += dx * f;
            nodes[j].v[1] += dy * f;
        }
    }
    for (const { a, b, rest, k } of springs) {
        const dx = nodes[b].p[0] - nodes[a].p[0];
        const dy = nodes[b].p[1] - nodes[a].p[1];
        const d = Math.hypot(dx, dy) || 1;
        const f = (k * (d - rest)) / d;
        nodes[a].v[0] += dx * f;
        nodes[a].v[1] += dy * f;
        nodes[b].v[0] -= dx * f;
        nodes[b].v[1] -= dy * f;
    }
    for (const n of nodes) {
        // A weak pull to the centre keeps the clusters on the sheet; damping lets it come to rest.
        n.v[0] = 0.6 * (n.v[0] + 0.012 * (W / 2 - n.p[0]));
        n.v[1] = 0.6 * (n.v[1] + 0.016 * (H / 2 - n.p[1]));
        n.p[0] = Math.min(W - MARGIN, Math.max(MARGIN, n.p[0] + cool * n.v[0]));
        n.p[1] = Math.min(H - MARGIN, Math.max(MARGIN, n.p[1] + cool * n.v[1]));
    }
}

const degree = nodes.map(() => 0);
[...edges, ...crossLinks].forEach(([a, b]) => {
    degree[a]++;
    degree[b]++;
});
const hub = nodes.reduce((best, n, i) => (n.book && degree[i] > degree[best] ? i : best), 0);
const books = nodes.filter((n) => n.book);
const ideas = nodes.filter((n) => !n.book);

export default function GraphFigure() {
    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="Illustration: a graph view of eleven books, each surrounded by its idea notes, with some ideas linked across books."
            className="h-full w-full"
        >
            <YellowGlow id="brain-hub" cx={nodes[hub].p[0]} cy={nodes[hub].p[1]} r={70} seed={7} />

            <g fill="none" className="stroke-ink" strokeWidth={0.6} opacity={0.7}>
                {edges.map(([a, b], k) => (
                    <path key={k} d={path([nodes[a].p, nodes[b].p])} />
                ))}
            </g>
            <g fill="none" className="stroke-ink-rose mix-blend-multiply" strokeWidth={0.9} strokeDasharray="2 2.5">
                {crossLinks.map(([a, b], k) => (
                    <path key={k} d={path([nodes[a].p, nodes[b].p])} />
                ))}
            </g>

            {ideas.map(({ p: [x, y] }, k) => (
                <circle key={k} cx={x} cy={y} r={2.2} className="fill-ink" />
            ))}
            <g className="fill-paper stroke-ink-purple mix-blend-multiply" strokeWidth={1.4}>
                {books.map(({ p: [x, y] }, k) => (
                    <circle key={k} cx={x + 1.2} cy={y + 1.2} r={5.5} />
                ))}
            </g>
            <g fill="none" className="stroke-ink" strokeWidth={0.8}>
                {books.map(({ p: [x, y] }, k) => (
                    <circle key={k} cx={x} cy={y} r={5.5} />
                ))}
            </g>
        </svg>
    );
}
