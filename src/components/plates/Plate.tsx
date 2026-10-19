import type { ReactNode } from 'react';

interface PlateProps {
    kicker: string;
    title: string;
    note?: ReactNode;
    children?: ReactNode; // the generated figure; without one the plate is just its heading
}

// A page header laid out like a plate from a technical atlas: typewritten heading over the
// figure, with an italic note in the corner.
export default function Plate({
    kicker,
    title,
    note,
    children,
}: PlateProps) {
    return (
        <header className={`relative ${children ? 'h-[34rem] sm:h-auto sm:aspect-[1000/640]' : ''}`}>
            {children && <div className="absolute inset-0">{children}</div>}

            <div className="halo relative space-y-1">
                <p className="plate-label">{kicker}</p>
                <h1 className="font-display text-4xl sm:text-5xl font-medium leading-none tracking-tight">{title}</h1>
            </div>

            {note && (
                <p className="halo absolute right-0 top-0 hidden max-w-[15rem] text-right text-base italic leading-snug text-ink-rose md:block">
                    {note}
                </p>
            )}
        </header>
    );
}
