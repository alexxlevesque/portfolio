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
        <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
            {/* Image Area - Smaller than project card */}
            <div className="h-48 w-full bg-space_cadet relative overflow-hidden group">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={`${title} Cover`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-space_cadet/10">
                        <span className="text-space_cadet/40 font-serif italic text-lg">{title}</span>
                    </div>
                )}

                {/* Overlay Rating */}
                {rating && (
                    <div className="absolute top-3 right-3 bg-space_cadet/90 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded shadow-lg border border-white/10">
                        {rating}
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                {/* Header */}
                <div className="mb-3">
                    <h3 className="text-lg font-serif font-bold text-space_cadet leading-tight mb-1">
                        {link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-rose_quartz transition-colors">
                                {title}
                            </a>
                        ) : (
                            title
                        )}
                    </h3>
                    <p className="text-sm text-space_cadet/70 font-medium">By {author}</p>
                </div>

                {/* Content */}
                <div className="space-y-3 text-sm text-space_cadet/80 leading-relaxed flex-grow">
                    <div className={`relative ${!isExpanded ? 'line-clamp-3' : ''}`}>
                        {thoughts}
                    </div>
                </div>

                {/* Expand / Collapse Action */}
                <div className="pt-4 mt-auto border-t border-black/5 flex justify-end">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-space_cadet/60 hover:text-space_cadet transition-colors"
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
