import type { ReactNode } from 'react';

interface PlateProps {
    numeral: string;
    kicker: string;
    title: string;
    note?: ReactNode;
    children?: ReactNode; // the generated figure; without one the plate is just its heading
}

// A page header laid out like a plate from a technical atlas: Roman numeral and typewritten heading over the
// figure, with an italic note in the corner.
export default function Plate({
    numeral,
    kicker,
    title,
    note,
    children,
}: PlateProps) {
    return (
        <header className={`relative ${children ? 'h-[34rem] sm:h-auto sm:aspect-[1000/640]' : ''}`}>
            {children && <div className="absolute inset-0">{children}</div>}

            <div className="halo relative flex items-start gap-4 sm:gap-6">
                <span aria-hidden="true" className="font-display text-6xl sm:text-7xl font-black leading-[0.8]">
                    {numeral}
                </span>
                <div className="space-y-1">
                    <p className="plate-label">{kicker}</p>
                    <h1 className="font-display text-4xl sm:text-5xl font-medium leading-none tracking-tight">{title}</h1>
                </div>
            </div>

            {note && (
                <p className="halo absolute right-0 top-0 hidden max-w-[15rem] text-right text-base italic leading-snug text-ink-rose md:block">
                    {note}
                </p>
            )}
        </header>
    );
}
