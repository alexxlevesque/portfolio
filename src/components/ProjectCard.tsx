'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
    title: string;
    status: string;
    year?: string;
    outcome: string;
    techStack: string;
    constraints: string;
    description?: React.ReactNode;
    imageSrc?: string;
    imagePosition?: string;
    imageScale?: number;
    grayscale?: boolean;
    contrast?: boolean;
    customFilter?: string;
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
    imagePosition = 'center',
    imageScale = 1,
    grayscale = false,
    contrast = false,
    customFilter = ''
}: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            {/* Banner Area */}
            <div className="h-64 w-full bg-space_cadet relative overflow-hidden">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={`${title} Preview`}
                        fill
                        className={`object-cover ${grayscale ? 'grayscale' : ''} ${contrast ? 'contrast-150' : ''}`}
                        style={{
                            objectPosition: imagePosition,
                            transform: `scale(${imageScale})`,
                            filter: customFilter
                        }}
                        priority
                    />
                ) : (
                    <>
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
                                backgroundSize: '20px 20px'
                            }}>
                        </div>
                        {/* Abstract shapes or patterns could go here */}
                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-rose_quartz/20 rounded-full blur-2xl transform translate-x-10 translate-y-10"></div>
                    </>
                )}
            </div>

            <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-space_cadet tracking-tight max-w-xl">
                        {title}
                    </h3>
                    <span className={`shrink-0 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${status === 'CURRENT'
                            ? 'bg-steel_blue text-white border-steel_blue'
                            : 'bg-space_cadet text-white border-steel_blue/30'
                        }`}>
                        {status}
                    </span>
                </div>

                {/* Metadata Block */}
                <div className="space-y-3 text-sm leading-relaxed text-space_cadet mb-6">
                    <p>
                        <strong className="font-semibold text-space_cadet">Outcome:</strong> {outcome}
                    </p>
                    <p>
                        <strong className="font-semibold text-space_cadet">Tech Stack:</strong> {techStack}
                    </p>
                    <p>
                        <strong className="font-semibold text-space_cadet">Key Constraints:</strong> {constraints}
                    </p>
                </div>

                {/* Expandable Content */}
                {description && (
                    <div className="border-t border-black/5 pt-4">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-wider text-space_cadet/60 hover:text-space_cadet transition-colors"
                        >
                            {isExpanded ? 'Collapse' : 'Click to expand'}
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="text-sm text-space_cadet/80 leading-relaxed space-y-4">
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
