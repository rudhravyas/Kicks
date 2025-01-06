/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      keyframes: {
        zoomOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '1' },
        },
      },
      animation: {
        zoomOut: 'zoomOut 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

