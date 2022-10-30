/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite"
      },
      colors: {
        mainblue: "#0E0D17"
      }
    }
  },
  plugins: []
}
