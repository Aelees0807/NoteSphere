/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'charcoal-blue': '#111827',
        'cloud-gray': '#F9FAFB',
        'electric-blue': '#3B82F6',
        'cyber-green': '#34D399',
        'neon-magenta': '#EC4899',
      },
    },
  },
  plugins: [],
}