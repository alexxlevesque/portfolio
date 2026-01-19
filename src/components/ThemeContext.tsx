"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'basic' | 'frutiger' | 'minecraft' | 'potter';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('basic');

    useEffect(() => {
        // Check local storage or system preference on mount
        const savedTheme = localStorage.getItem('theme') as Theme;
        const validThemes: Theme[] = ['basic', 'frutiger', 'minecraft', 'potter'];

        if (savedTheme && validThemes.includes(savedTheme)) {
            setTheme(savedTheme);
        } else {
            // If invalid or missing, default to basic and clean up
            setTheme('basic');
            localStorage.setItem('theme', 'basic');
        }
    }, []);

    useEffect(() => {
        // Apply theme class to body
        document.body.classList.remove('frutiger-aero', 'minecraft', 'potter');
        if (theme === 'frutiger') {
            document.body.classList.add('frutiger-aero');
        } else if (theme === 'minecraft') {
            document.body.classList.add('minecraft');
        } else if (theme === 'potter') {
            document.body.classList.add('potter');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            if (prev === 'basic') return 'frutiger';
            if (prev === 'frutiger') return 'minecraft';
            if (prev === 'minecraft') return 'potter';
            return 'basic';
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
