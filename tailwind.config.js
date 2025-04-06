/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bodyColor: "#f42c37",
      },
      fontFamily: {
        playfair: ["PlayfairDisplay", "serif"],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar-hide"),
  ],
};
