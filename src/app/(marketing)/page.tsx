import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { QuickInquiry } from "@/components/forms/QuickInquiry.client";
import { MotionRefresh } from "@/components/motion/Reveal.client";
import { ProofRail } from "@/components/marketing/ProofRail";
import { ArrivalRelay } from "@/components/spreads/ArrivalRelay.client";
import { IslandChapter } from "@/components/spreads/IslandChapter.client";
import { Craft } from "@/components/spreads/Craft";
import { Origin } from "@/components/spreads/Origin";
import { Table } from "@/components/spreads/Table";
import { Trade } from "@/components/spreads/Trade";
import { proofPoints } from "@/content/site";

export const metadata: Metadata = {
  title: "Caribbean heat, made for tables and shelves",
  description:
    "A five-generation Scotch bonnet pepper sauce from St. Vincent and Trinidad & Tobago, now in the United States. Direct orders, wholesale distribution, and retail partnerships.",
  alternates: { canonical: "/" },
};

/**
 * The Family Table — five magazine spreads, not a scrolling feed.
 * I Arrival (ink) · II Origin (ink→cream) · III Craft (cream) ·
 * IV Table (cream) · V Trade (ink). Creative direction:
 * docs/design/2026-08-02-creative-direction.md
 */
export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/media/hero.v2.poster.webp"
        fetchPriority="high"
      />
      <MotionRefresh />

      {/* ── I. ARRIVAL ─────────────────────────────────────────────── */}
      {/* HERO INVARIANTS — measured failure modes, not styling notes:
          1. Keep xl:grid-cols-2, film order-first/xl:order-last, the copy cap
             at --si-container/2, --si-container <= 1280px, and no vw-based
             alignment. These are what keep the h1 and <Container> aligned at
             1280/1440/1920.
          2. .si-hollow stays a block, Archivo wdth 100, and on exactly one
             client rect at 390/1024/inside the xl column.
          3. Hero height uses svh only; dvh/vh reintroduces mobile URL-bar CLS.
          4. Above-fold media and h1 stay opaque, server/final-positioned, and
             free of SplitText/Lines or any JS-dependent DOM rewrite. */}
      {/* A real split, not type over film. The jar and the wordmark sit dead
          centre in the footage, so every scrim-based attempt at this still
          put the headline across the product. Two columns make the overlap
          impossible: the film gets a stage, the copy gets solid ink. */}
      <section className="relative isolate overflow-hidden bg-ink">
        {/* The split starts at xl, not lg. Below 1280 the copy column is too
            narrow to hold "made for tables" on one line, and orphaning a word
            out of the hollow line is worse than stacking. */}
        <div className="grid min-h-[calc(100svh-var(--si-header-h))] xl:grid-cols-2">
          {/* FILM. Above the copy when stacked, beside it once split. */}
          <div className="relative order-first min-h-[44svh] xl:order-last xl:min-h-0">
            <ArrivalRelay />
          </div>

          {/* COPY. `ml-auto` + a half-container cap lands this column's text
              on exactly the same left edge as <Container> everywhere else on
              the page — and it does so without touching `vw`, which would
              drift by the scrollbar width. The trick depends on the split
              being exactly 50/50, so do not make these columns uneven. */}
          <div className="relative z-10 order-last flex flex-col justify-center bg-ink py-14 xl:order-first xl:py-20">
            <div className="ml-auto w-full max-w-[calc(var(--si-container)/2)] px-gutter xl:pr-8">
              <Eyebrow onInk>Sunny Island · Classic Gold</Eyebrow>

              {/* Measured 2026-08-03 with Lighthouse 12.8.2: mobile LCP is the
                  hero <video>; desktop LCP is the poster <img>. Neither media
                  node may be faded, clipped, translated, resized, or painted
                  below opacity:1. The h1 is server-rendered and also receives
                  zero JS motion. Solid line + one hollow-stroke line — the
                  film-overlay type signature.

                  Sized per band rather than straight off `text-hero`: the
                  hollow line is the widest thing on the page and it has to
                  survive on ONE line at 390px and inside the half-width
                  column alike, or the break reads as a mistake. */}
              <h1 className="mt-5 font-display text-[2.0625rem] leading-[var(--si-leading-hero)] tracking-hero text-on-ink sm:text-hero xl:text-[3.25rem]">
                Caribbean heat,
                <span className="si-hollow block">made for tables</span>
                and shelves.
              </h1>

              <p className="mt-6 max-w-[40ch] text-lede text-on-ink-muted">
                Scotch bonnet, green papaya, and a family recipe carried five
                generations from St.&nbsp;Vincent to
                Trinidad&nbsp;&amp;&nbsp;Tobago.
              </p>

              {/* The fast lane. Anyone with a real brief still gets the
                  adaptive form at the foot of the page. */}
              <Suspense fallback={null}>
                <QuickInquiry className="mt-9" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Proof rail — approved claims only. */}
      <div className="si-grain relative border-y border-ink-line bg-ink">
        <Container>
          <ProofRail points={proofPoints} />
        </Container>
      </div>

      {/* ── II. ORIGIN ─────────────────────────────────────────────── */}
      <Origin />

      {/* ── II·V. THE ISLAND — the one WebGL scene ─────────────────── */}
      <IslandChapter />

      {/* ── III. CRAFT ─────────────────────────────────────────────── */}
      <Craft />

      {/* ── IV. THE TABLE ──────────────────────────────────────────── */}
      <Table />

      {/* ── V. TRADE ───────────────────────────────────────────────── */}
      <Trade />
    </>
  );
}
