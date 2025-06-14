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
      },
    },
    darkMode: 'class',
    plugins: [
      require('tailwind-scrollbar-hide'),
    ],
  }
  