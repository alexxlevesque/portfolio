'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

export default function LumosEffect() {
    const { theme } = useTheme();
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (theme !== 'potter') return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!overlayRef.current) return;
            const { clientX, clientY } = e;
            // Create a "flashlight" effect: 
            // The center is transparent (showing the page), fading to dark ink-black at the edges.
            // Using a slightly warm, parchment-tinted clear zone for the light source.
            overlayRef.current.style.background = `radial-gradient(circle 400px at ${clientX}px ${clientY}px, transparent 10%, rgba(10, 5, 0, 0.85) 100%)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [theme]);

    if (theme !== 'potter') return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 pointer-events-none z-[40] transition-colors duration-500"
            style={{
                // Initial state before mouse moves (default central shine or full dark)
                // We'll set a default center spotlight to ensure not pitch black immediately
                background: 'radial-gradient(circle 400px at 50% 50%, transparent 10%, rgba(10, 5, 0, 0.85) 100%)'
            }}
        />
    );
}
