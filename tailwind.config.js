/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Single hue. Everything is a blue or a neutral derived from it.
        ink: {
          DEFAULT: '#07182E',
          900: '#07182E',
          800: '#0C2647',
          700: '#123563',
        },
        brand: {
          50: '#EFF5FC',
          100: '#DAE8F7',
          200: '#B4D0EE',
          300: '#84B0E0',
          400: '#4E8BCE',
          500: '#2468B4',
          600: '#175293',
          700: '#114073',
          800: '#0C2E53',
          900: '#07182E',
        },
        mist: '#F3F6FB',
        slateink: '#41506A',
      },
      fontFamily: {
        sans: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.18em',
      },
      keyframes: {
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        risein: { '0%': { opacity: '0', transform: 'translateY(6px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        risein: 'risein 220ms ease-out both',
      },
    },
  },
  plugins: [],
}
