/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#141414",
          50: "#C1C1C1",
          100: "#B7B7B7",
          200: "#A3A3A3",
          300: "#8E8E8E",
          400: "#7A7A7A",
          500: "#666666",
          600: "#515151",
          700: "#3D3D3D",
          800: "#282828",
          900: "#141414",
          950: "#060606",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
