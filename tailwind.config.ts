// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          // primary: yellow-orange gradient (you can adjust the shades)
          DEFAULT: "#FFB300", // base gold-ish yellow/orange
          light: "#FFC107",
          dark: "#FFA000",
        },
        secondary: "#DA1A35", // your secondary color
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(to right, #FFB300, #FFC107, #FFA000)",
      },
    },
  },
  plugins: [],
};
