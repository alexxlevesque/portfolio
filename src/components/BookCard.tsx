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
        <div className="border-t border-ink/70 pt-4 flex flex-col h-full">
            {/* Image Area - Smaller than project card */}
            <div className="h-48 w-full bg-paper border border-ink/70 relative overflow-hidden group">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={`${title} Cover`}
                        fill
                        className="object-cover mix-blend-multiply"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display italic text-2xl text-ink/60">{title}</span>
                    </div>
                )}

                {/* Overlay Rating */}
                {rating && (
                    <div className="absolute top-3 right-3 bg-paper plate-label px-2 py-1 border border-ink/70">
                        {rating}
                    </div>
                )}
            </div>

            <div className="pt-4 flex flex-col flex-grow">
                {/* Header */}
                <div className="mb-3">
                    <h3 className="font-display text-2xl font-medium leading-tight mb-1">
                        {link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:bg-ink-yellow/50">
                                {title}
                            </a>
                        ) : (
                            title
                        )}
                    </h3>
                    <p className="plate-label text-ink/80">By {author}</p>
                </div>

                {/* Content */}
                <div className="space-y-3 text-base leading-relaxed flex-grow">
                    <div className={`relative ${!isExpanded ? 'line-clamp-3' : ''}`}>
                        {thoughts}
                    </div>
                </div>

                {/* Expand / Collapse Action */}
                <div className="pt-3 mt-auto border-t border-dotted border-ink/40 flex justify-end">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1.5 plate-label px-1 hover:bg-ink-yellow/50"
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
