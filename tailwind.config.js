/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mde: {
          void: '#030407',
          black: '#07090E',
          card: '#0C0E17',
          surface: '#111522',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-active': 'rgba(0, 242, 254, 0.35)',
          cyan: '#00F2FE',
          'cyan-glow': 'rgba(0, 242, 254, 0.25)',
          violet: '#8B5CF6',
          'violet-glow': 'rgba(139, 92, 246, 0.25)',
          emerald: '#10B981',
          muted: '#8E9BB0',
          text: '#E2E8F0',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Space Grotesk"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(0, 242, 254, 0.25)',
        'violet-glow': '0 0 25px rgba(139, 92, 246, 0.25)',
        'cyan-subtle': '0 0 15px rgba(0, 242, 254, 0.12)',
        'inner-glow': 'inset 0 0 15px rgba(0, 242, 254, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
