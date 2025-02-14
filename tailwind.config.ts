// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          // You can continue to use these for other elements
          DEFAULT: "#FFB300",
          light: "#FFC107",
          dark: "#FFA000",
        },
        secondary: "#DA1A35",
      },
      backgroundImage: {
        // Day mode background: a smooth white/milk/honey gradient
        "primary-gradient": "linear-gradient(to right, #fff9e6, #fff1c1, #fff9e6)",
        // Night mode background: a dark textured (charcoal/black) pattern via inline SVG noise
        "dark-texture":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%230a0a0a' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
