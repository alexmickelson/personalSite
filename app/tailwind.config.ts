import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ebcde4",
        secondary: "#5abaf4",
        othersecondary: "#76a6c4",
        dark: "#263c5c",
        background: "#1f182e",
      },
    },
  },
  plugins: [],
};
export default config;
