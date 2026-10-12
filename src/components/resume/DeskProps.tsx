import GrainFilter from '@/components/plates/GrainFilter';

const ink = (channel: string, alpha = 1) => `rgb(var(--${channel}) / ${alpha})`;

// A yellow HB pencil, printed in flat spot inks.
export function Pencil({ height }: { height: number }) {
    return (
        <svg viewBox="0 0 24 300" height={height} aria-hidden="true" className="overflow-visible">
            <defs>
                <GrainFilter id="pencil-tooth" seed={4} />
            </defs>
            <g filter="url(#pencil-tooth)">
                <rect x="0" y="0" width="24" height="26" rx="6" style={{ fill: ink('ink-rose') }} />
                <rect x="0" y="22" width="24" height="22" style={{ fill: ink('ink', 0.32) }} />
                <rect x="0" y="27" width="24" height="1.5" style={{ fill: ink('ink', 0.55) }} />
                <rect x="0" y="37" width="24" height="1.5" style={{ fill: ink('ink', 0.55) }} />
                <rect x="0" y="44" width="24" height="206" style={{ fill: ink('ink-yellow') }} />
                <rect x="16" y="44" width="8" height="206" style={{ fill: ink('ink-rose', 0.16) }} />
                <rect x="3" y="44" width="2" height="206" style={{ fill: ink('paper', 0.5) }} />
                <path d="M0 250 L24 250 L14.6 289 L9.4 289 Z" fill="rgb(228 200 150)" />
                <path d="M0 248 V251 q4 7 8 0 q4 7 8 0 q4 7 8 0 V248 Z" style={{ fill: ink('ink-yellow') }} />
                <path d="M9.4 289 L14.6 289 L12 300 Z" style={{ fill: ink('ink') }} />
            </g>
        </svg>
    );
}

// A capless fountain pen: indigo barrel, a band and nib of yellow ink.
export function Pen({ height }: { height: number }) {
    return (
        <svg viewBox="0 0 20 280" height={height} aria-hidden="true" className="overflow-visible">
            <defs>
                <GrainFilter id="pen-tooth" seed={9} />
            </defs>
            <g filter="url(#pen-tooth)">
                <rect x="0" y="0" width="20" height="196" rx="9" style={{ fill: ink('ink-purple') }} />
                <rect x="4" y="10" width="2" height="180" rx="1" style={{ fill: ink('paper', 0.35) }} />
                <rect x="13" y="8" width="3.2" height="84" rx="1.6" style={{ fill: ink('ink', 0.7) }} />
                <circle cx="14.6" cy="92" r="2.6" style={{ fill: ink('ink', 0.7) }} />
                <rect x="0" y="190" width="20" height="7" style={{ fill: ink('ink-yellow') }} />
                <path d="M2 197 H18 L15.5 238 H4.5 Z" style={{ fill: ink('ink') }} />
                <path d="M4.5 238 H15.5 L10 276 Z" style={{ fill: ink('ink-yellow') }} />
                <path d="M10 250 V272" style={{ stroke: ink('ink') }} strokeWidth="0.8" />
                <circle cx="10" cy="249" r="1.3" style={{ fill: ink('ink') }} />
            </g>
        </svg>
    );
}

// A wire paperclip, drawn as one stroke.
export function Paperclip({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 18 46" width="18" height="46" aria-hidden="true" className={`overflow-visible ${className}`}>
            <path
                d="M12.5 14 V33 A3.5 3.5 0 0 1 5.5 33 V7 A5.5 5.5 0 0 1 16.5 7 V37 A7.5 7.5 0 0 1 1.5 37 V18"
                fill="none"
                style={{ stroke: ink('ink', 0.62) }}
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}
