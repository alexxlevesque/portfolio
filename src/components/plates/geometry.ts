export type Point = [number, number];

// Seeded PRNG (mulberry32), so every build draws the same plate.
export function random(seed: number) {
    return () => {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const fmt = (n: number) => String(Math.round(n * 10) / 10);

export function path(points: Point[]) {
    return points.map(([x, y], i) => `${i ? 'L' : 'M'}${fmt(x)} ${fmt(y)}`).join('');
}

// Many round-capped zero-length strokes in one path: the cheapest way to print stipple in SVG.
export function dots(points: Point[]) {
    return points.map(([x, y]) => `M${fmt(x)} ${fmt(y)}h0`).join('');
}

export function length(points: Point[]) {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
        total += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    }
    return total;
}

// Marching-squares segments per cell case. Edges: 0 top, 1 right, 2 bottom, 3 left.
// Corner bits: 1 top-left, 2 top-right, 4 bottom-right, 8 bottom-left. Saddles (5, 10) are resolved below.
const CASES: number[][][] = [
    [], [[3, 0]], [[0, 1]], [[3, 1]], [[1, 2]], [], [[0, 2]], [[3, 2]],
    [[2, 3]], [[0, 2]], [], [[1, 2]], [[1, 3]], [[0, 1]], [[3, 0]], [],
];

/**
 * Level-set polylines of a sampled field, in grid coordinates (column, row).
 * `values` is row-major with `nx` columns and `ny` rows.
 */
export function contours(values: Float64Array, nx: number, ny: number, level: number): Point[][] {
    const at = (i: number, j: number) => values[j * nx + i];
    // Edge ids: 2k is the horizontal edge leaving sample k to the right, 2k + 1 the vertical edge leaving it downward.
    const points = new Map<number, Point>();
    const links = new Map<number, number[]>();

    const edgePoint = (id: number): Point => {
        let p = points.get(id);
        if (!p) {
            const k = id >> 1;
            const i = k % nx;
            const j = (k - i) / nx;
            const [i2, j2] = id & 1 ? [i, j + 1] : [i + 1, j];
            const a = at(i, j);
            const t = (level - a) / (at(i2, j2) - a);
            p = [i + (i2 - i) * t, j + (j2 - j) * t];
            points.set(id, p);
        }
        return p;
    };

    const link = (a: number, b: number) => {
        (links.get(a) ?? links.set(a, []).get(a)!).push(b);
        (links.get(b) ?? links.set(b, []).get(b)!).push(a);
    };

    for (let j = 0; j < ny - 1; j++) {
        for (let i = 0; i < nx - 1; i++) {
            const v0 = at(i, j), v1 = at(i + 1, j), v2 = at(i + 1, j + 1), v3 = at(i, j + 1);
            const c = (v0 > level ? 1 : 0) | (v1 > level ? 2 : 0) | (v2 > level ? 4 : 0) | (v3 > level ? 8 : 0);
            if (c === 0 || c === 15) continue;

            const k = j * nx + i;
            const edges = [2 * k, 2 * (k + 1) + 1, 2 * (k + nx), 2 * k + 1];
            let segments = CASES[c];
            if (c === 5 || c === 10) {
                // Saddle: if the cell centre is above the level, the two high corners join up.
                const centreHigh = (v0 + v1 + v2 + v3) / 4 > level;
                segments = (c === 5) === centreHigh ? [[0, 1], [2, 3]] : [[3, 0], [1, 2]];
            }
            for (const [a, b] of segments) link(edges[a], edges[b]);
        }
    }

    // Each edge touches at most two segments, so the links form simple chains: walk the open ones from
    // their ends first, then whatever is left over is a closed loop.
    const seen = new Set<number>();
    const lines: Point[][] = [];
    const walk = (start: number) => {
        const ids = [start];
        seen.add(start);
        let prev = -1;
        let cur = start;
        for (;;) {
            const next = links.get(cur)!.find((n) => n !== prev && !seen.has(n));
            if (next === undefined) break;
            seen.add(next);
            ids.push(next);
            prev = cur;
            cur = next;
        }
        const line = ids.map(edgePoint);
        if (ids.length > 2 && links.get(cur)!.includes(start)) line.push(line[0]);
        lines.push(line);
    };
    links.forEach((n, id) => {
        if (n.length === 1 && !seen.has(id)) walk(id);
    });
    links.forEach((_, id) => {
        if (!seen.has(id)) walk(id);
    });

    return lines;
}
