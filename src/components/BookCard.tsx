'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BookCardProps {
    title: string;
    author: string;
    thoughts: React.ReactNode;
    imageSrc?: string;
    rating?: string; // e.g. "5/5"
    link?: string;
}

export default function BookCard({
    title,
    author,
    thoughts,
    imageSrc,
    rating,
    link
}: BookCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-paper border-2 border-ink-blue overflow-hidden shadow-plate-sm flex flex-col h-full">
            {/* Image Area - Smaller than project card */}
            <div className="h-48 w-full bg-paper border-b-2 border-ink-blue relative overflow-hidden group">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={`${title} Cover`}
                        fill
                        className="object-cover grayscale mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                ) : (
                    <div className="riso-screen absolute inset-0 flex items-center justify-center text-ink-blue/30">
                        <span className="riso-display text-ink-blue text-2xl">{title}</span>
                    </div>
                )}

                {/* Overlay Rating */}
                {rating && (
                    <div className="absolute top-3 right-3 bg-ink-yellow text-ink-blue font-mono text-xs font-bold px-2 py-1 border-2 border-ink-blue">
                        {rating}
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                {/* Header */}
                <div className="mb-3">
                    <h3 className="riso-display text-2xl mb-1">
                        {link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:riso-mark">
                                {title}
                            </a>
                        ) : (
                            title
                        )}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider">By {author}</p>
                </div>

                {/* Content */}
                <div className="space-y-3 text-sm leading-relaxed flex-grow">
                    <div className={`relative ${!isExpanded ? 'line-clamp-3' : ''}`}>
                        {thoughts}
                    </div>
                </div>

                {/* Expand / Collapse Action */}
                <div className="pt-4 mt-auto border-t-2 border-dashed border-ink-blue/60 flex justify-end">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider px-1 hover:bg-ink-yellow"
                    >
                        {isExpanded ? 'Less' : 'More'}
                        <svg
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
