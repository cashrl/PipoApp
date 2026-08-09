/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4FBEF7",
        success: "#63D471",
        warning: "#FFD93D",
        danger: "#FF6B6B",
        pink: "#FFB7D5",
        cream: "#FFF9F2",
        dark: "#2D3436",
        muted: "#636E72",
      },
      fontFamily: {
        fredoka: ["Fredoka_400Regular", "Fredoka_500Medium", "Fredoka_600SemiBold", "Fredoka_700Bold"],
      },
    },
  },
  plugins: [],
};
