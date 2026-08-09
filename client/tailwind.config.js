/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F7F9',
        surface: '#FFFFFF',
        ink: '#0C1E2E',
        soft: '#54697D',
        navy: {
          DEFAULT: '#0E2A44',
          dark: '#081826'
        },
        teal: {
          DEFAULT: '#158C8C',
          light: '#CFEFEE',
          dark: '#0E6666'
        },
        signal: '#E2A33D',
        line: '#E2E6EA'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      maxWidth: {
        content: '1180px'
      },
      keyframes: {
        underline: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        underline: 'underline 0.6s cubic-bezier(0.65,0,0.35,1) forwards',
        marquee: 'marquee 22s linear infinite'
      }
    }
  },
  plugins: []
};
