// Breaks up a flat fill with the paper's tooth, so it prints like a riso solid. Use inside <defs>.
export default function GrainFilter({ id, seed = 1 }: { id: string; seed?: number }) {
    return (
        <filter id={id}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -3 2.1" result="m" />
            <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
    );
}
