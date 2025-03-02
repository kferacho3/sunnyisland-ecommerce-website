// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FFB300",
          light: "#FFC107",
          dark: "#FFA000",
        },
        secondary: {
          DEFAULT: "#DA1A35",
        },
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(to right, #FFB300, #FFC107, #FFA000)",
      },
    },
  },
  plugins: [],
};
