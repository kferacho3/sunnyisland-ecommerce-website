/**
 * Email design tokens.
 *
 * Deliberately not the site's CSS custom properties — email clients do not
 * support them reliably. These are literal values, inlined at render time.
 * Colours are sampled from the Sunny Island label artwork.
 */

export const color = {
  ink: "#0B0D0D",
  inkSoft: "#16191A",
  inkLine: "#262B2C",
  cream: "#FAF6EF",
  creamDim: "#E8E1D5",
  gold: "#FCC000",
  goldDim: "#8A6A00",
  ember: "#F05400",
  maroon: "#780024",
  muted: "#8B8F90",
  white: "#FFFFFF",
} as const;

/**
 * Georgia carries the editorial tone of Fraunces and is present on effectively
 * every mail client. Custom webfonts are unreliable in email; do not add one.
 */
export const font = {
  display: "Georgia, 'Times New Roman', Times, serif",
  body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
} as const;

export const space = {
  page: "24px",
  gutter: "28px",
  block: "20px",
  tight: "10px",
} as const;

export const MAX_WIDTH = 600;

/* --------------------------------------------------------------- fragments */

export const body = {
  backgroundColor: color.cream,
  margin: 0,
  padding: `${space.page} 12px`,
  fontFamily: font.body,
  WebkitFontSmoothing: "antialiased" as const,
};

export const card = {
  width: "100%",
  maxWidth: `${MAX_WIDTH}px`,
  margin: "0 auto",
  backgroundColor: color.white,
  borderRadius: "14px",
  overflow: "hidden" as const,
  border: `1px solid ${color.creamDim}`,
};

export const heading = {
  fontFamily: font.display,
  fontSize: "26px",
  lineHeight: "32px",
  fontWeight: 400 as const,
  color: color.ink,
  margin: `0 0 ${space.tight} 0`,
  letterSpacing: "-0.01em",
};

export const paragraph = {
  fontFamily: font.body,
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3A3F40",
  margin: `0 0 ${space.block} 0`,
};

export const eyebrow = {
  fontFamily: font.body,
  fontSize: "11px",
  lineHeight: "16px",
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: color.goldDim,
  fontWeight: 700 as const,
  margin: `0 0 6px 0`,
};

export const label = {
  fontFamily: font.body,
  fontSize: "11px",
  lineHeight: "16px",
  letterSpacing: "0.09em",
  textTransform: "uppercase" as const,
  color: color.muted,
  fontWeight: 600 as const,
  margin: 0,
  paddingBottom: "2px",
};

export const value = {
  fontFamily: font.body,
  fontSize: "15px",
  lineHeight: "22px",
  color: color.ink,
  margin: 0,
  fontWeight: 500 as const,
};

export const referenceChip = {
  fontFamily: font.mono,
  fontSize: "13px",
  letterSpacing: "0.08em",
  color: color.gold,
  backgroundColor: "rgba(252,192,0,0.10)",
  border: "1px solid rgba(252,192,0,0.35)",
  borderRadius: "999px",
  padding: "6px 12px",
  display: "inline-block" as const,
};

export const button = {
  fontFamily: font.body,
  fontSize: "15px",
  fontWeight: 600 as const,
  color: color.ink,
  backgroundColor: color.gold,
  borderRadius: "999px",
  padding: "13px 26px",
  textDecoration: "none" as const,
  display: "inline-block" as const,
};

export const hr = {
  border: "none",
  borderTop: `1px solid ${color.creamDim}`,
  margin: `${space.block} 0`,
};

export const footerText = {
  fontFamily: font.body,
  fontSize: "12px",
  lineHeight: "19px",
  color: color.muted,
  margin: "0 0 4px 0",
};
