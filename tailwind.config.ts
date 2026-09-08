import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d9efff",
          200: "#bce4ff",
          300: "#8ed4ff",
          400: "#59baff",
          500: "#3399ff",
          600: "#1a78f5",
          700: "#1461e1",
          800: "#174eb6",
          900: "#19448f",
          950: "#142a57",
        },
      },
    },
  },
  plugins: [],
};
export default config;
