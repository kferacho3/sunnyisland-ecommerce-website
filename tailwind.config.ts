import type { Config } from "tailwindcss";

/**
 * Every value here resolves to a CSS custom property defined in
 * src/styles/tokens.css. Retinting the brand is a token edit, never a
 * component edit. Tokens store colours as `<r> <g> <b>` channels and the
 * `<alpha-value>` placeholder lets Tailwind's opacity modifiers (bg-ink/60)
 * keep working.
 */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--si-ink) / <alpha-value>)",
          raised: "rgb(var(--si-ink-raised) / <alpha-value>)",
          line: "rgb(var(--si-ink-line) / <alpha-value>)",
        },
        cream: {
          DEFAULT: "rgb(var(--si-cream) / <alpha-value>)",
          raised: "rgb(var(--si-cream-raised) / <alpha-value>)",
          sunk: "rgb(var(--si-cream-sunk) / <alpha-value>)",
          line: "rgb(var(--si-cream-line) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--si-gold) / <alpha-value>)",
          deep: "rgb(var(--si-gold-deep) / <alpha-value>)",
        },
        ember: "rgb(var(--si-ember) / <alpha-value>)",
        maroon: "rgb(var(--si-maroon) / <alpha-value>)",
        "on-ink": {
          DEFAULT: "rgb(var(--si-text-on-ink) / <alpha-value>)",
          muted: "rgb(var(--si-text-on-ink-muted) / <alpha-value>)",
        },
        "on-cream": {
          DEFAULT: "rgb(var(--si-text-on-cream) / <alpha-value>)",
          muted: "rgb(var(--si-text-on-cream-muted) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: "var(--si-font-display)",
        body: "var(--si-font-body)",
        mono: "var(--si-font-mono)",
      },
      fontSize: {
        "display-xl": [
          "var(--si-text-display-xl)",
          { lineHeight: "0.92", letterSpacing: "-0.02em" },
        ],
        hero: ["var(--si-text-hero)", { lineHeight: "var(--si-leading-hero)" }],
        display: [
          "var(--si-text-display)",
          { lineHeight: "var(--si-leading-display)" },
        ],
        title: [
          "var(--si-text-title)",
          { lineHeight: "var(--si-leading-title)" },
        ],
        heading: ["var(--si-text-heading)", { lineHeight: "1.2" }],
        lede: ["var(--si-text-lede)", { lineHeight: "var(--si-leading-body)" }],
        eyebrow: [
          "var(--si-text-eyebrow)",
          {
            lineHeight: "1.4",
            letterSpacing: "var(--si-tracking-eyebrow)",
          },
        ],
      },
      letterSpacing: {
        hero: "var(--si-tracking-hero)",
        display: "var(--si-tracking-display)",
        eyebrow: "var(--si-tracking-eyebrow)",
      },
      spacing: {
        gutter: "var(--si-gutter)",
        section: "var(--si-section)",
        "section-tight": "var(--si-section-tight)",
        header: "var(--si-header-h)",
      },
      maxWidth: {
        container: "var(--si-container)",
        narrow: "var(--si-container-narrow)",
        measure: "var(--si-measure)",
      },
      borderRadius: {
        sm: "var(--si-radius-sm)",
        DEFAULT: "var(--si-radius)",
        lg: "var(--si-radius-lg)",
        pill: "var(--si-radius-pill)",
      },
      boxShadow: {
        sm: "var(--si-shadow-sm)",
        DEFAULT: "var(--si-shadow)",
        lift: "var(--si-shadow-lift)",
        gold: "var(--si-glow-gold)",
      },
      transitionTimingFunction: {
        si: "var(--si-ease)",
        "si-standard": "var(--si-ease-standard)",
      },
      transitionDuration: {
        instant: "var(--si-dur-instant)",
        fast: "var(--si-dur-fast)",
        medium: "var(--si-dur-medium)",
        slow: "var(--si-dur-slow)",
        page: "var(--si-dur-page)",
      },
      zIndex: {
        header: "var(--si-z-header)",
        nav: "var(--si-z-nav)",
        overlay: "var(--si-z-overlay)",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translate3d(0, 14px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        "rise-in": "rise-in var(--si-dur-slow) var(--si-ease) both",
        "fade-in": "fade-in var(--si-dur-medium) var(--si-ease) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
