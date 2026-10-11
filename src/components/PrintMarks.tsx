import type { CSSProperties } from 'react';

// Decorative printer's furniture around the sheet. Purely visual, so hidden from assistive tech.

export function RegistrationMark({ className = '' }: { className?: string }) {
    const mark = (
        <>
            <circle cx="12" cy="12" r="5.5" />
            <path d="M12 1v22M1 12h22" />
        </>
    );

    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="1.1" className={className}>
            <g className="stroke-ink-blue">{mark}</g>
            <g className="stroke-ink-pink mix-blend-multiply" transform="translate(0.9 0.6)">{mark}</g>
        </svg>
    );
}

const overprint = (top: string, bottom: string): CSSProperties => ({
    background: `linear-gradient(rgb(var(--ink-${top})), rgb(var(--ink-${top}))), rgb(var(--ink-${bottom}))`,
    backgroundBlendMode: 'multiply',
});

export function ColorBar({ className = '' }: { className?: string }) {
    return (
        <div aria-hidden="true" className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-blue/70 ${className}`}>
            <span>Blue · Fluo Pink · Yellow</span>
            <div className="flex">
                <span className="h-3 w-5 bg-ink-blue" />
                <span className="h-3 w-5 bg-ink-pink" />
                <span className="h-3 w-5 bg-ink-yellow" />
                <span className="h-3 w-5" style={overprint('pink', 'blue')} />
                <span className="h-3 w-5" style={overprint('yellow', 'pink')} />
                <span className="h-3 w-5" style={overprint('yellow', 'blue')} />
                <span className="riso-screen h-3 w-5 text-ink-blue" />
                <span className="riso-screen h-3 w-5 text-ink-pink" />
            </div>
        </div>
    );
}
