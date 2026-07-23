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
        pipo: {
          cream: "#FFF5E6",
          purple: "#4A2080",
          green: "#2ECC71",
          greenDark: "#27AE60",
        },
      },
    },
  },
  plugins: [],
};
