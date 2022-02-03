const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ["responsive", "motion-safe", "motion-reduce"],
      opacity: ["disabled", "group-disabled"],
      backgroundColor: ["disabled", "group-disabled"],
      textColor: ["disabled", "group-disabled"],
      padding: ["hover"],
      cursor: ["disabled", "group-disabled"],

      colors: {
        cyan: colors.cyan,
        blueGray: colors.blueGray,
        coolGray: colors.gray,
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        emerald: colors.emerald,
        teal: colors.teal,
        sky: colors.sky,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-interaction-variants"),
  ],
};
