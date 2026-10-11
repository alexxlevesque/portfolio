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
        sans: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
      },
      // Riso spot inks. Channels live in globals.css so the canvas halftone can read them too.
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: {
          blue: 'rgb(var(--ink-blue) / <alpha-value>)',
          pink: 'rgb(var(--ink-pink) / <alpha-value>)',
          yellow: 'rgb(var(--ink-yellow) / <alpha-value>)',
        },
      },
      boxShadow: {
        'plate-sm': '4px 4px 0 0 rgb(var(--ink-pink))',
        plate: '10px 10px 0 0 rgb(var(--ink-pink))',
      },
    },
  },
  plugins: [],
}
