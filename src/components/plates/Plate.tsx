import type { ReactNode } from 'react';

interface PlateProps {
    numeral: string;
    kicker: string;
    title: string;
    formula?: string;
    note?: ReactNode;
    caption: ReactNode;
    children: ReactNode; // the generated figure
}

// A page header laid out like a plate from a technical atlas: Roman numeral, typewritten heading and formula
// over the figure, an italic note in the corner and the figure's caption at its foot.
export default function Plate({ numeral, kicker, title, formula, note, caption, children }: PlateProps) {
    return (
        <header className="relative h-[34rem] sm:h-auto sm:aspect-[1000/640]">
            <div className="absolute inset-0">{children}</div>

            <div className="halo relative flex items-start gap-4 sm:gap-6">
                <span aria-hidden="true" className="font-display text-6xl sm:text-7xl font-black leading-[0.8]">
                    {numeral}
                </span>
                <div className="space-y-1">
                    <p className="plate-label">{kicker}</p>
                    <h1 className="font-display text-4xl sm:text-5xl font-medium leading-none tracking-tight">{title}</h1>
                    {formula && <p className="pt-1 font-mono text-xs tracking-wide text-ink/80">{formula}</p>}
                </div>
            </div>

            {note && (
                <p className="halo absolute right-0 top-0 hidden max-w-[15rem] text-right text-base italic leading-snug text-ink-rose md:block">
                    {note}
                </p>
            )}

            <p className="halo absolute bottom-0 left-0 max-w-sm text-sm italic leading-snug text-ink-rose">{caption}</p>
        </header>
    );
}
