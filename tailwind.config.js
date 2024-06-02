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
        upcoming: "#3B774F",
        sectionBorder: "rgba(0, 0, 0, .125)"
      }
    }
  }
}
