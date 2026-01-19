"use client";

import { useTheme } from "./ThemeContext";

export default function Bubbles() {
    const { theme } = useTheme();

    if (theme !== "frutiger") return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[60]">
            {/* Defined a few organic bubbles with varying sizes, speeds and delays */}
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-white/20 rounded-full blur-[1px] border border-white/30 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]"
                    style={{
                        width: `${20 + i * 15}px`,
                        height: `${20 + i * 15}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${100 + Math.random() * 20}%`,
                        animation: `float-across ${15 + i * 5}s linear infinite`,
                        animationDelay: `${i * -3}s`,
                        opacity: 0.4 + (i % 3) * 0.1,
                    }}
                >
                    {/* Shine effect inside bubble */}
                    <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white/40 rounded-full" />
                </div>
            ))}

            <style jsx>{`
        @keyframes float-across {
          0% {
            transform: translateY(0) translateX(0) scale(1);
          }
          33% {
            transform: translateY(-40vh) translateX(20px) scale(1.1);
          }
          66% {
            transform: translateY(-70vh) translateX(-20px) scale(0.9);
          }
          100% {
            transform: translateY(-120vh) translateX(0) scale(1);
          }
        }
      `}</style>
        </div>
    );
}
