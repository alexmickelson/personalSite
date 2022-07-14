/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const myColors = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  dark: "var(--color-dark)",
  bg: {
    DEFAULT: '#2F1D4E',
    '50': '#8460C3',
    '100': '#7951BD',
    '200': '#653FA6',
    '300': '#533489',
    '400': '#41296B',
    '500': '#2F1D4E',
    '600': '#281943',
    '700': '#221537',
    '800': '#1B112C',
    '900': '#140D21'
  },
  ...colors,
};
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // textColor: myColors,
    // backgroundColor: myColors,
    colors: myColors,
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};
