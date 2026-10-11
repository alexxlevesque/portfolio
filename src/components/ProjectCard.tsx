'use client';

import { useState } from 'react';

interface ProjectCardProps {
    title: string;
    status: string;
    year?: string;
    figure?: string; // plate reference, e.g. "Fig. II.1"
    outcome: string;
    techStack: string;
    constraints: string;
    description?: React.ReactNode;
    illustration?: React.ReactNode; // a small generated picture, rendered by the page on the server
}

export default function ProjectCard({
    title,
    status,
    year,
    figure,
    outcome,
    techStack,
    constraints,
    description,
    illustration
}: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const metadata = [
        ['Outcome', outcome],
        ['Tech Stack', techStack],
        ['Key Constraints', constraints],
    ];

    return (
        <article className="border-t border-ink/70 pt-4">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                {figure && <span className="plate-label shrink-0 text-ink-rose sm:w-32">{figure}</span>}
                <h3 className="font-display text-3xl sm:text-4xl font-medium leading-tight tracking-tight">
                    {title}
                </h3>
            </div>

            <div className="mb-6 grid items-start gap-6 md:grid-cols-[22rem_1fr] md:gap-8">
                {illustration && <div className="aspect-[4/3] border border-ink/70 bg-paper">{illustration}</div>}

                {/* Metadata Block */}
                <dl className="space-y-3 text-lg leading-relaxed">
                    {metadata.map(([label, value]) => (
                        <div key={label} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                            <dt className="plate-label pt-1.5 text-ink/80">{label}:</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            {/* Expandable Content */}
            {description && (
                <div className="border-t border-dotted border-ink/40 pt-3">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        className="plate-link no-underline"
                    >
                        <span className="text-ink-rose">[{isExpanded ? '−' : '+'}]</span> {isExpanded ? 'Collapse' : 'Click to expand'}
                    </button>

                    <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="text-lg leading-relaxed space-y-4">
                                {description}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}
