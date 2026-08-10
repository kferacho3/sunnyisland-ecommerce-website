import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { QuickInquiry } from "@/components/forms/QuickInquiry.client";
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
          <div className="relative order-first mx-gutter mt-4 h-[clamp(18rem,40svh,22rem)] overflow-hidden border border-ink-line bg-ink-raised xl:order-last xl:m-0 xl:h-auto xl:min-h-0 xl:border-0">
            {/* MOBILE CAMPAIGN PLATE. The previous five-slice treatment read
                as broken image seams on a phone and multiplied the softness
                of the 750px poster. This is one high-resolution, 31 KB frame:
                still cheap enough to be the mobile LCP, but materially
                sharper and composed as a physical campaign plate. */}
            <Image
              src="/media/hero.v2.poster.webp"
              alt="A jar of Sunny Island Pepper Sauce beneath the Sunny Island wordmark."
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1280px) 0px, 100vw"
              unoptimized
              decoding="sync"
              className="object-cover object-center xl:hidden"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--si-ink)/0.28)_0%,transparent_28%,transparent_66%,rgb(var(--si-ink)/0.72)_100%)] xl:hidden"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-2 border border-on-ink/10 xl:hidden"
            />
            <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-on-ink xl:hidden">
              <span>01 / Arrival</span>
              <span>Classic Gold</span>
            </div>
            <div className="absolute inset-x-4 bottom-4 z-10 flex items-center gap-3 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-on-ink-muted xl:hidden">
              <span>St. Vincent</span>
              <span aria-hidden className="h-px flex-1 bg-on-ink/20" />
              <span>Trinidad &amp; Tobago</span>
            </div>
            {/* The DESKTOP base layer. It was pointed at the 750x422 mobile
                file, which object-cover then upscaled 2.3x into a ~720x978
                column — a visibly soft jar on every desktop that lands in
                static mode (reduced motion, Save-Data, or pre-hydration).
                <picture> rather than a class swap, because `hidden xl:block`
                only stops an <img> from PAINTING — the browser still fetches
                it, so a plain src swap would have billed every phone 32 KB for
                a layer it never shows. A non-matching <source> is never
                fetched, and below xl this resolves to the same mobile poster
                the strip above already has in cache: zero extra bytes. */}
            <picture>
              <source
                media="(min-width: 1280px)"
                srcSet="/media/hero.v2.poster.webp"
              />
              <img
                src="/media/hero.v2.mobile.poster.webp"
                alt=""
                aria-hidden
                loading="eager"
                decoding="async"
                className="absolute inset-0 hidden h-full w-full object-cover opacity-100 xl:block"
              />
            </picture>
            <ArrivalRelay className="hidden xl:block" />
          </div>

          {/* COPY. `ml-auto` + a half-container cap lands this column's text
              on exactly the same left edge as <Container> everywhere else on
              the page — and it does so without touching `vw`, which would
              drift by the scrollbar width. The trick depends on the split
              being exactly 50/50, so do not make these columns uneven. */}
          <div className="relative z-10 order-last flex flex-col justify-center bg-ink pb-12 pt-10 xl:order-first xl:py-20">
            <div className="ml-auto w-full max-w-[calc(var(--si-container)/2)] px-gutter xl:pr-8">
              <Eyebrow onInk>Sunny Island · Classic Gold</Eyebrow>

              {/* Measured 2026-08-04 with Lighthouse 12: mobile LCP is this
                  h1; desktop LCP is the poster <img>. Neither node may be
                  faded, translated, resized, or painted below opacity:1. The
                  h1 is server-rendered and receives zero JS motion. Solid line
                  + one hollow-stroke line — the film-overlay type signature.

                  Sized per band rather than straight off `text-hero`: the
                  hollow line is the widest thing on the page and it has to
                  survive on ONE line at 390px and inside the half-width
                  column alike, or the break reads as a mistake. */}
              <h1 className="mt-5 font-display text-[2.0625rem] leading-[var(--si-leading-hero)] tracking-hero text-on-ink sm:text-hero xl:text-[3.25rem]">
                Caribbean heat,
                <span className="si-hollow block">made for tables</span>
                and shelves.
              </h1>

              {/* Leads with the two things that actually differentiate the
                  product. "Five generations" is the page's most-repeated
                  phrase — it belongs to the Origin headline and the proof
                  rail, and saying it here as well made the hero the third
                  place a visitor read it before scrolling once. */}
              <p className="mt-5 max-w-[40ch] text-[1rem] leading-[1.7] text-on-ink-muted sm:mt-6 sm:text-lede sm:leading-[var(--si-leading-body)]">
                Scotch bonnet and green papaya — a family recipe from
                St.&nbsp;Vincent, refined in Trinidad&nbsp;&amp;&nbsp;Tobago.
              </p>

              {/* The fast lane. Anyone with a real brief still gets the
                  adaptive form at the foot of the page. */}
              <Suspense fallback={null}>
                <QuickInquiry className="mt-7 sm:mt-9" />
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
