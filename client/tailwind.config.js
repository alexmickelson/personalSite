/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const myColors = {

  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  dark: "var(--color-dark)",
  bg: "var(--color-bg)",
  ...colors,
}
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    textColor: myColors,
    backgroundColor: myColors,
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};
