/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#eff6ff', // bg-blue-50
          DEFAULT: '#2563eb', // bg-blue-600
          dark: '#1e40af', // bg-blue-800
        },
        surface: '#f8fafc', // Very light gray-blue for backgrounds
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}