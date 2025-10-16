/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' },
      colors: { brand: { DEFAULT: '#0b308e', 600:'rgba(34,93,174,0.74)', 700:'#3a99ed' } }
    },
  },
  plugins: [],
}
