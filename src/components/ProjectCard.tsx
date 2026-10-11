'use client';

import { useState } from 'react';
import RisoImage from '@/components/RisoImage';

interface ProjectCardProps {
    title: string;
    status: string;
    year?: string;
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
    outcome,
    techStack,
    constraints,
    description,
    imageSrc,
    imageScale = 1
}: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-paper border-2 border-ink-blue shadow-plate">
            {/* Banner Area */}
            {imageSrc ? (
                <RisoImage
                    src={imageSrc}
                    alt={`${title} Preview`}
                    sizes="(min-width: 896px) 800px, 100vw"
                    scale={imageScale}
                    priority
                    className="h-64 w-full border-b-2 border-ink-blue"
                />
            ) : (
                <div className="h-64 w-full relative overflow-hidden border-b-2 border-ink-blue">
                    <div className="riso-screen absolute inset-0 text-ink-blue/40" />
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-ink-pink mix-blend-multiply" />
                </div>
            )}

            <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-col gap-2 mb-6">
                    <h3 className="riso-display text-3xl sm:text-4xl max-w-xl">
                        {title}
                    </h3>
                </div>

                {/* Metadata Block */}
                <div className="space-y-3 text-base leading-relaxed mb-6">
                    <p>
                        <strong className="riso-highlight font-mono text-sm uppercase tracking-wider">Outcome:</strong> {outcome}
                    </p>
                    <p>
                        <strong className="riso-highlight font-mono text-sm uppercase tracking-wider">Tech Stack:</strong> {techStack}
                    </p>
                    <p>
                        <strong className="riso-highlight font-mono text-sm uppercase tracking-wider">Key Constraints:</strong> {constraints}
                    </p>
                </div>

                {/* Expandable Content */}
                {description && (
                    <div className="border-t-2 border-dashed border-ink-blue/60 pt-4">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                aria-expanded={isExpanded}
                                className="riso-button"
                            >
                                {isExpanded ? 'Collapse' : 'Click to expand'}
                                <svg
                                    className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="square" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="text-base leading-relaxed space-y-4">
                                    {description}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
