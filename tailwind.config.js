/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tm: {
          red: "rgb(197 50 45)",
          black: "rgb(21 21 21)",
          white: "rgb(235 235 235)",
        },
        azure: {
          blue: "rgb(86	166	225)",
        },
      },
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
        interstate: ["Interstate", "sans-serif"],
      },
      backgroundImage: {
        texture: "url('/60-lines.png')",
      },
    },
  },
  plugins: [],
};
