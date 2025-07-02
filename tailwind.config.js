/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Noto Sans KR'", 'sans-serif'],
      },
      keyframes: {
        loadingDots: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%':      { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      animation: {
        'loading-dots': 'loadingDots 1s linear infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp'),
  ],
}
  