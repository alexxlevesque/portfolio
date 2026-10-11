'use client';

import { useState } from 'react';
import Figure from '@/components/Figure';

interface ProjectCardProps {
    title: string;
    status: string;
    year?: string;
    figure?: string; // plate reference, e.g. "Fig. II.1"
    outcome: string;
    techStack: string;
    constraints: string;
    description?: React.ReactNode;
    imageSrc?: string;
    imageScale?: number;
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
    imageSrc,
    imageScale
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

            {/* Banner Area */}
            {imageSrc && (
                <Figure
                    src={imageSrc}
                    alt={`${title} Preview`}
                    sizes="(min-width: 1024px) 960px, 100vw"
                    scale={imageScale}
                    priority
                    className="mb-6"
                    frameClassName="h-56 sm:h-72"
                />
            )}

            {/* Metadata Block */}
            <dl className="mb-6 space-y-3 text-lg leading-relaxed">
                {metadata.map(([label, value]) => (
                    <div key={label} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                        <dt className="plate-label pt-1.5 text-ink/80">{label}:</dt>
                        <dd>{value}</dd>
                    </div>
                ))}
            </dl>

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
                            <div className="text-lg leading-relaxed space-y-4 sm:pl-[9.5rem]">
                                {description}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}
