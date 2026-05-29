import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fff9f2",
        pearl: "#fffdf9",
        beige: "#e9d7c3",
        blush: {
          50: "#fff6f7",
          100: "#fdecef",
          200: "#f8d4db",
          300: "#efb5c0",
          500: "#d98999",
          700: "#9f5261",
        },
        gold: {
          100: "#f8efd9",
          300: "#e6c977",
          500: "#c9a646",
          700: "#8f7025",
        },
        espresso: "#3b2f2f",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(92, 64, 51, 0.10)",
        glow: "0 18px 45px rgba(217, 137, 153, 0.22)",
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
