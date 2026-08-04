import { ImageResponse } from "next/og";

export const alt =
  "Sunny Island Pepper Sauce — Caribbean heat, made for tables and shelves.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sunnyislandpepper.com";
  const emblem = new URL("/media/SunnyIslandSymbol.png", siteUrl).toString();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#080503",
        color: "#f9f0e0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "radial-gradient(circle at 78% 80%, rgba(240,84,0,.32), transparent 45%), radial-gradient(circle at 90% 30%, rgba(252,192,0,.16), transparent 38%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "62%",
          padding: "64px 0 64px 72px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: ".2em",
            color: "#fcc000",
            textTransform: "uppercase",
          }}
        >
          Sunny Island · Classic Gold
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 0.94,
            letterSpacing: "-.045em",
            textTransform: "uppercase",
          }}
        >
          <span>Caribbean heat,</span>
          <span style={{ color: "#fcc000" }}>made for tables</span>
          <span>and shelves.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#baa489" }}>
          Five generations · St. Vincent → Trinidad &amp; Tobago → United States
        </div>
      </div>
      <img
        src={emblem}
        alt=""
        width="520"
        height="520"
        style={{
          position: "absolute",
          right: -38,
          bottom: -78,
          objectFit: "contain",
          opacity: 0.92,
        }}
      />
    </div>,
    size,
  );
}
