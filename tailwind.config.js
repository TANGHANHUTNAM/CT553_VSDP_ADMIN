/** @type {import('tailwindcss').Config} */
import {
  GLOBAL_COLOR,
  GLOBAL_COLOR_TEXT_PRIMARY,
  GLOBAL_COLOR_TEXT_SECONDARY,
} from "./src/constants/colorCustom";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: GLOBAL_COLOR,
        text_primary: GLOBAL_COLOR_TEXT_PRIMARY,
        text_secondary: GLOBAL_COLOR_TEXT_SECONDARY,
        dark: {
          DEFAULT: "#141414",
          50: "#C1C1C1",
          100: "#B7B7B7",
          200: "#A3A3A3",
          300: "#8E8E8E",
          400: "#7A7A7A",
          500: "#666666",
          600: "#515151",
          700: "#2B2B2B",
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
