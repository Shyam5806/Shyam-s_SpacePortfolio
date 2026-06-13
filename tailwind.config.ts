import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: '#0a0a0f',
        nebula: '#0d0d1a',
        'accent-purple': '#8B7FFF',
        'accent-cyan': '#4FC3F7',
      },
      fontFamily: {
        mono: ["'Space Mono'", 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 1.5s ease-in-out infinite',
        'float-y': 'floatY 2.4s ease-in-out infinite',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
