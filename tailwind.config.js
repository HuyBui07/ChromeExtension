/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  plugins: [],
  theme: {
    extend: {
      colors: {
        overdue: "#E93737",
        upcoming: "#3B774F"
      }
    }
  }
}
