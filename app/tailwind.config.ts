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
        primary: "#fbb1e8",
        secondary: "#5abaf4",
        othersecondary: "#8eb7d0",
        dark: "#263c5c",
        background: "#1f182e",
      },
    },
  },
  plugins: [],
};
export default config;
