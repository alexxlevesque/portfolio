/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-garamond)', 'Garamond', 'Times New Roman', 'serif'],
        display: ['var(--font-bodoni)', 'Didot', 'Bodoni 72', 'serif'],
        mono: ['var(--font-courier)', 'Courier New', 'monospace'],
      },
      // Spot inks on cream stock. Channels live in globals.css.
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          yellow: 'rgb(var(--ink-yellow) / <alpha-value>)',
          rose: 'rgb(var(--ink-rose) / <alpha-value>)',
          purple: 'rgb(var(--ink-purple) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
