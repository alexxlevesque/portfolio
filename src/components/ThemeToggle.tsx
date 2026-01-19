"use client";

import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
        fixed bottom-6 right-6 z-[100] p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer
        ${theme === 'frutiger'
                    ? 'bg-gradient-to-br from-green-400 to-blue-500 border-2 border-white/50 shadow-[0_0_15px_rgba(74,222,128,0.5)]'
                    : theme === 'minecraft'
                        ? 'bg-[#757575] border-t-4 border-l-4 border-white/40 border-b-4 border-r-4 border-black/40 rounded-none shadow-none active:border-t-black/40 active:border-l-black/40 active:border-b-white/40 active:border-r-white/40'
                        : theme === 'potter'
                            ? 'bg-[#740001] border-2 border-[#D3A625] shadow-[0_0_10px_#D3A625] hover:bg-[#AE0001]' // Gryffindor Red & Gold
                            : 'bg-space_cadet-600 border border-white/10 hover:bg-space_cadet-700'}
      `}
            aria-label="Toggle Theme"
        >
            <div className={`text-xl transition-colors duration-300 ${theme === 'frutiger' ? 'text-white drop-shadow-md' : theme === 'minecraft' ? 'text-white' : theme === 'potter' ? 'text-[#D3A625]' : 'text-isabelline'}`}>
                {theme === 'frutiger' ? '🫧' : theme === 'minecraft' ? '⚔️' : theme === 'potter' ? '⚡' : '⚫'}
            </div>

            {/* Glossy shine effect for frutiger mode */}
            {theme === 'frutiger' && (
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full pointer-events-none" />
            )}
        </button>
    );
}
