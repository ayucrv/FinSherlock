import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: { 900: '#0A0C10', 800: '#13161D', 700: '#1C2030' },
        gold: { 400: '#E5C990', 500: '#D4AF37', 600: '#C19A2B' },
        brass: '#B5A67E',
        bronze: '#CD7F32',
        emerald: { 500: '#2ECC71', 700: '#1E8449' },
        midnight: '#0D1B2A',
        pixel: '#8AB4F8',
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 1s infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        glitch: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.8', transform: 'translateX(2px)' } },
      },
      boxShadow: {
        'glow-gold': '0 0 15px 2px rgba(212, 175, 55, 0.3)',
        'glow-emerald': '0 0 15px 2px rgba(46, 204, 113, 0.3)',
        'inner-glow': 'inset 0 0 10px rgba(212, 175, 55, 0.1)',
      },
    },
  },
  plugins: [],
}
export default config