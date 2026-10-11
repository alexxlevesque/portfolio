import { contours, path, random, type Point } from './geometry';
import YellowGlow from './YellowGlow';

// The firefighting swarm, computed: drones launched from one corner run Lloyd's algorithm against a
// heat map of fire hotspots, each moving to the heat-weighted centroid of its Voronoi cell.
const W = 400;
const H = 300;

const HOTSPOTS = [
    { x: 285, y: 92, a: 1, s: 36 },
    { x: 125, y: 175, a: 0.75, s: 30 },
    { x: 330, y: 228, a: 0.55, s: 24 },
];
// A small floor keeps every drone pulled somewhere, even over unburnt ground.
const heat = (x: number, y: number) =>
    0.02 + HOTSPOTS.reduce((v, h) => v + h.a * Math.exp(-((x - h.x) ** 2 + (y - h.y) ** 2) / (2 * h.s * h.s)), 0);

const STEP = 4;
const nx = W / STEP + 1;
const ny = H / STEP + 1;
const field = new Float64Array(nx * ny);
const samples: { p: Point; w: number }[] = [];
for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
        const p: Point = [i * STEP, j * STEP];
        field[j * nx + i] = heat(...p);
        samples.push({ p, w: field[j * nx + i] });
    }
}

const nearest = (p: Point, sites: Point[]) => {
    let best = 0;
    let bestD = Infinity;
    sites.forEach(([x, y], k) => {
        const d = (p[0] - x) ** 2 + (p[1] - y) ** 2;
        if (d < bestD) {
            bestD = d;
            best = k;
        }
    });
    return best;
};

const DRONES = 9;
const rand = random(5);
let drones: Point[] = Array.from({ length: DRONES }, (): Point => [24 + 54 * rand(), 236 + 48 * rand()]);
const trails: Point[][] = drones.map((d) => [d]);
for (let iteration = 0; iteration < 30; iteration++) {
    const sum = drones.map(() => ({ x: 0, y: 0, w: 0 }));
    for (const { p, w } of samples) {
        const s = sum[nearest(p, drones)];
        s.x += p[0] * w;
        s.y += p[1] * w;
        s.w += w;
    }
    drones = drones.map((d, k): Point => (sum[k].w > 0 ? [sum[k].x / sum[k].w, sum[k].y / sum[k].w] : d));
    trails.forEach((trail, k) => trail.push(drones[k]));
}

// Each Voronoi cell is the sheet clipped by the half-planes nearer its drone than any other.
function keepNearer(poly: Point[], site: Point, other: Point): Point[] {
    const [dx, dy] = [other[0] - site[0], other[1] - site[1]];
    const [mx, my] = [(site[0] + other[0]) / 2, (site[1] + other[1]) / 2];
    const side = ([x, y]: Point) => (x - mx) * dx + (y - my) * dy;
    const out: Point[] = [];
    poly.forEach((a, i) => {
        const b = poly[(i + 1) % poly.length];
        const da = side(a);
        const db = side(b);
        if (da <= 0) out.push(a);
        if ((da <= 0) !== (db <= 0)) {
            const t = da / (da - db);
            out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
        }
    });
    return out;
}
const sheet: Point[] = [[0, 0], [W, 0], [W, H], [0, H]];
const cells = drones.map((site) => drones.reduce((poly, other) => (other === site ? poly : keepNearer(poly, site, other)), sheet));

const isotherms = [0.15, 0.3, 0.45, 0.6, 0.75, 0.9].flatMap((level) =>
    contours(field, nx, ny, level).map((line) => line.map(([i, j]): Point => [i * STEP, j * STEP])),
);

export default function SwarmFigure() {
    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="Illustration: nine drones launched from one corner spread over three fire hotspots, settling into a Voronoi partition of the area."
            className="h-full w-full"
        >
            {HOTSPOTS.map(({ x, y, s }, k) => (
                <YellowGlow key={k} id={`fire-${k}`} cx={x} cy={y} r={2.8 * s} seed={k + 3} />
            ))}

            <g fill="none" className="stroke-ink-rose mix-blend-multiply" strokeWidth={0.7}>
                {isotherms.map((line, i) => (
                    <path key={i} d={path(line)} />
                ))}
            </g>

            <g fill="none" className="stroke-ink-purple mix-blend-multiply" strokeWidth={1.1} transform="translate(1.2 1.2)">
                {cells.map((cell, k) => (
                    <path key={k} d={`${path(cell)}Z`} />
                ))}
            </g>

            <g fill="none" className="stroke-ink" strokeWidth={0.7} strokeDasharray="1.5 2.5" opacity={0.8}>
                {trails.map((trail, k) => (
                    <path key={k} d={path(trail)} />
                ))}
            </g>
            {trails.map(([start], k) => (
                <circle key={k} cx={start[0]} cy={start[1]} r={2} fill="none" className="stroke-ink" strokeWidth={0.8} />
            ))}
            {drones.map(([x, y], k) => (
                <circle key={k} cx={x} cy={y} r={3.4} className="fill-ink" />
            ))}
        </svg>
    );
}
