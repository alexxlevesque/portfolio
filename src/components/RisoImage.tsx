'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// A two-drum tonal split: pink carries the midtones and blue only the shadows. Each drum is
// screened at its own angle, and the pink one lands slightly off-register from the blue one.
// Tone t (0 = white, 1 = black) prints as ((t - lo) / (hi - lo)) ^ gamma of full coverage.
const PLATES = [
    { ink: 'pink', angle: 75, offset: [1.5, -1], lo: 0.1, hi: 0.85, gamma: 1.4 },
    { ink: 'blue', angle: 15, offset: [0, 0], lo: 0.55, hi: 1, gamma: 1 },
] as const;

interface RisoImageProps {
    src: string;
    alt: string;
    sizes: string;
    className?: string;
    cell?: number; // halftone cell size, in CSS px
    scale?: number; // extra zoom on top of object-fit: cover
    priority?: boolean;
}

function printHalftone(canvas: HTMLCanvasElement, img: HTMLImageElement, cell: number, scale: number) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h || !img.naturalWidth) return false;

    // Sample the photo at two samples per halftone cell, cropped like object-fit: cover.
    const sw = Math.ceil((w / cell) * 2);
    const sh = Math.ceil((h / cell) * 2);
    const sample = document.createElement('canvas');
    sample.width = sw;
    sample.height = sh;
    const sctx = sample.getContext('2d', { willReadFrequently: true });
    if (!sctx) return false;
    sctx.imageSmoothingQuality = 'high';
    const fit = Math.max(sw / img.naturalWidth, sh / img.naturalHeight) * scale;
    const dw = img.naturalWidth * fit;
    const dh = img.naturalHeight * fit;
    sctx.drawImage(img, (sw - dw) / 2, (sh - dh) / 2, dw, dh);
    const pixels = sctx.getImageData(0, 0, sw, sh).data;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const styles = getComputedStyle(document.documentElement);
    const reach = Math.ceil(Math.hypot(w, h) / 2 / cell) + 1;

    PLATES.forEach(({ ink, angle, offset: [ox, oy], lo, hi, gamma }, index) => {
        const cos = Math.cos((angle * Math.PI) / 180);
        const sin = Math.sin((angle * Math.PI) / 180);
        const dots = new Path2D();

        for (let i = -reach; i <= reach; i++) {
            for (let j = -reach; j <= reach; j++) {
                const x = w / 2 + (i * cos - j * sin) * cell;
                const y = h / 2 + (i * sin + j * cos) * cell;
                if (x < -cell || y < -cell || x > w + cell || y > h + cell) continue;

                const sx = Math.min(sw - 1, Math.max(0, Math.floor((x / w) * sw)));
                const sy = Math.min(sh - 1, Math.max(0, Math.floor((y / h) * sh)));
                const p = (sy * sw + sx) * 4;
                const luminance = (0.2126 * pixels[p] + 0.7152 * pixels[p + 1] + 0.0722 * pixels[p + 2]) / 255;
                // Transparent pixels print nothing.
                const tone = (1 - luminance) * (pixels[p + 3] / 255);
                const density = Math.min(1, Math.max(0, (tone - lo) / (hi - lo))) ** gamma;
                if (density < 0.03) continue;

                const r = cell * 0.72 * Math.sqrt(density);
                dots.moveTo(x + ox + r, y + oy);
                dots.arc(x + ox, y + oy, r, 0, Math.PI * 2);
            }
        }

        // Later drums overprint the earlier ones, so overlaps darken like real ink.
        ctx.globalCompositeOperation = index === 0 ? 'source-over' : 'multiply';
        ctx.fillStyle = `rgb(${styles.getPropertyValue(`--ink-${ink}`).trim().split(/\s+/).join(',')})`;
        ctx.fill(dots);
    });

    return true;
}

// Renders an image as a two-colour riso halftone. Until the canvas has printed (or without JS),
// a single-ink CSS duotone of the same image stands in.
export default function RisoImage({
    src,
    alt,
    sizes,
    className = '',
    cell = 4,
    scale = 1,
    priority = false,
}: RisoImageProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [printed, setPrinted] = useState(false);

    // A cached image can finish loading before hydration, in which case onLoad never fires.
    useEffect(() => {
        if (imgRef.current?.complete && imgRef.current.naturalWidth) setLoaded(true);
    }, []);

    useEffect(() => {
        const img = imgRef.current;
        const canvas = canvasRef.current;
        if (!loaded || !img || !canvas) return;

        let frame = 0;
        const observer = new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                if (printHalftone(canvas, img, cell, scale)) setPrinted(true);
            });
        });
        observer.observe(canvas);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [loaded, cell, scale]);

    return (
        <div className={`relative isolate overflow-hidden bg-paper ${className}`}>
            <div className={`riso-mono absolute inset-0 transition-opacity duration-300 ${printed ? 'opacity-0' : ''}`}>
                <Image
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    fill
                    sizes={sizes}
                    preload={priority}
                    className="object-cover"
                    style={{ transform: `scale(${scale})` }}
                    onLoad={() => setLoaded(true)}
                />
            </div>
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full mix-blend-multiply" />
        </div>
    );
}
