/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const myColors = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  dark: "var(--color-dark)",
  // bg: {
  //   DEFAULT: '#4A2E7B',
  //   '50': '#A68CD4',
  //   '100': '#9B7DCF',
  //   '200': '#845FC4',
  //   '300': '#6E44B6',
  //   '400': '#5C3998',
  //   '500': '#4A2E7B',
  //   '600': '#362159',
  //   '700': '#221538',
  //   '800': '#0D0816',
  //   '900': '#000000'
  // },
  bg: {
    DEFAULT: "#2F1D4E",
    50: "#8460C3",
    100: "#7951BD",
    200: "#653FA6",
    300: "#533489",
    400: "#41296B",
    500: "#2F1D4E",
    600: "#281943",
    700: "#221537",
    800: "#1B112C",
    900: "#140D21",
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
    fontSize: {
      sm: "0.8rem",
      base: "1.05rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  darkMode: "class",
  plugins: [],
};
