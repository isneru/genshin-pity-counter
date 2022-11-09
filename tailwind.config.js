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
        black: "#18181B",
        white: "#EEEEEE",
        pyro: "#AF2824",
        hydro: "#218DBB",
        anemo: "#289C8C",
        electro: "#7455BF",
        dendro: "#6EAB20",
        cryo: "#7BABD7",
        geo: "#E4A65B"
      }
    }
  },
  plugins: []
}
