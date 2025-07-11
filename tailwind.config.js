/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Mettez à jour ceci pour inclure les chemins vers tous vos fichiers de composants.
  content: [
    "./App.tsx", 
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "rubik": ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semi-bold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-extra-bold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors: {
        primary: {
          100: '#0061FF0A',
          200: '#0061FF1A',
          300: '#0061FF',
        },
        accent: {
          100: '#FBFBFD',
        },
        black: {
          DEFAULT: '#000000',
          100: '#8C8E98',
          200: '#666876',
          300: '#191d31',
        },
        danger: "F75555"
      },
    },
  },
  plugins: [],
}