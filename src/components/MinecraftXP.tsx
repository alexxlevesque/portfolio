'use client';

import { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    dx: number;
    dy: number;
}

export default function MinecraftXP() {
    const { theme } = useTheme();
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        if (theme !== 'minecraft') {
            setParticles([]);
            return;
        }

        const handleClick = (e: MouseEvent) => {
            const newParticles: Particle[] = [];
            // Spawn 3-6 orbs per click
            const count = 3 + Math.floor(Math.random() * 4);

            for (let i = 0; i < count; i++) {
                newParticles.push({
                    id: Date.now() + i,
                    x: e.clientX,
                    y: e.clientY,
                    // XP Orb colors: Lime Green to Yellowish
                    color: Math.random() > 0.5 ? '#80ff00' : '#ffff00',
                    dx: (Math.random() - 0.5) * 8, // Random horizontal spread
                    dy: -5 - Math.random() * 5,    // Upward velocity
                });
            }

            setParticles(prev => [...prev, ...newParticles]);
        };

        window.addEventListener('click', handleClick);

        // Animation Loop
        const interval = setInterval(() => {
            setParticles(prev => prev
                .map(p => ({
                    ...p,
                    x: p.x + p.dx,
                    y: p.y + p.dy,
                    dy: p.dy * 0.95, // slow down upward momentum
                    life: (p as any).life ? (p as any).life + 1 : 1
                }))
                .filter(p => (p as any).life < 30) // Remove after 30 frames (approx 0.5s)
            );
        }, 30);

        return () => {
            window.removeEventListener('click', handleClick);
            clearInterval(interval);
        };
    }, [theme]);

    if (theme !== 'minecraft') return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute w-3 h-3 border border-black shadow-sm"
                    style={{
                        left: p.x,
                        top: p.y,
                        backgroundColor: p.color,
                        imageRendering: 'pixelated',
                        boxShadow: 'inset 2px 2px rgba(255,255,255,0.5)', // Shine effect
                    }}
                />
            ))}
        </div>
    );
}
