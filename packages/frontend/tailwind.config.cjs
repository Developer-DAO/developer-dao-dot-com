const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Clash Display', ...defaultTheme.fontFamily.sans],
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        'footer': '3fr 1fr 1fr 1fr',
      }
    },
  },
  plugins: [],
};
