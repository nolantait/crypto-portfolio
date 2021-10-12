module.exports = {
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: "#10161a",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
