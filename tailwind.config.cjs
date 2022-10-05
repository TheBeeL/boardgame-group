/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        brand: ['"Oleo Script"', "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
