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
        primary: "#dc6fbf",
        secondary: "#5abaf4",
        othersecondary: "#629bbe",
        dark: "#263c5c",
        background: "#251543",
      },
    },
  },
  plugins: [],
};
export default config;
