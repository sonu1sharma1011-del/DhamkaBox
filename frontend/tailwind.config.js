/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dbox: {
          purple: '#1A0533',
          yellow: '#FFE600',
          pink: '#FF0066',
          dark: '#0D0D0D',
          card: '#1E1E2E',
        }
      }
    },
  },
  plugins: [],
}
