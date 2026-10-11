import Image from 'next/image';
import type { ReactNode } from 'react';

interface FigureProps {
    src: string;
    alt: string;
    sizes: string;
    label?: string;
    caption?: ReactNode;
    className?: string;
    frameClassName?: string; // sets the frame's size or aspect ratio
    scale?: number; // zoom on top of object-fit: cover, e.g. to crop a border
    priority?: boolean;
}

// A photo as it would be tipped into a plate: untreated, in a hairline frame, with a typewritten caption.
export default function Figure({
    src,
    alt,
    sizes,
    label,
    caption,
    className = '',
    frameClassName = '',
    scale,
    priority = false,
}: FigureProps) {
    return (
        <figure className={className}>
            <div className={`relative overflow-hidden border border-ink/70 bg-paper ${frameClassName}`}>
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes={sizes}
                    preload={priority}
                    className="object-cover mix-blend-multiply"
                    style={scale ? { transform: `scale(${scale})` } : undefined}
                />
            </div>
            {(label || caption) && (
                <figcaption className="mt-2 plate-label text-ink/80">
                    {label && <span className="text-ink-rose">{label}</span>}
                    {label && caption && ' — '}
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
