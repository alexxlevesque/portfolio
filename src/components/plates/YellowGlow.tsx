interface YellowGlowProps {
    id: string;
    cx: number;
    cy: number;
    r: number;
    seed?: number;
}

// A pool of yellow ink around a point, its edge broken up by the paper's tooth like a riso flat.
export default function YellowGlow({ id, cx, cy, r, seed = 1 }: YellowGlowProps) {
    const stop = (offset: string, opacity: number) => (
        <stop offset={offset} style={{ stopColor: 'rgb(var(--ink-yellow))', stopOpacity: opacity }} />
    );

    return (
        <g className="mix-blend-multiply">
            <defs>
                <radialGradient id={`${id}-fill`}>
                    {stop('0%', 1)}
                    {stop('22%', 0.95)}
                    {stop('50%', 0.6)}
                    {stop('78%', 0.2)}
                    {stop('100%', 0)}
                </radialGradient>
                <filter id={`${id}-tooth`} x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed={seed} result="noise" />
                    <feColorMatrix in="noise" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -0.7" result="tooth" />
                    <feComposite in="SourceGraphic" in2="tooth" operator="in" />
                </filter>
            </defs>
            <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-fill)`} filter={`url(#${id}-tooth)`} />
        </g>
    );
}
