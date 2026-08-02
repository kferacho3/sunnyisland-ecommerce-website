import type { Metadata } from "next";

import { Button, TextLink } from "@/components/core/Button";
import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { ART, FullBleedBand } from "@/components/media/FullBleed";
import { MotionRefresh } from "@/components/motion/Reveal.client";
import { ProofRail } from "@/components/marketing/ProofRail";
import { ArrivalRelay } from "@/components/spreads/ArrivalRelay.client";
import { IslandChapter } from "@/components/spreads/IslandChapter.client";
import { Craft } from "@/components/spreads/Craft";
import { Origin } from "@/components/spreads/Origin";
import { Table } from "@/components/spreads/Table";
import { Trade } from "@/components/spreads/Trade";
import { CTA, proofPoints } from "@/content/site";

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
      <MotionRefresh />

      {/* ── I. ARRIVAL ─────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-var(--si-header-h))] overflow-hidden bg-ink">
        <ArrivalRelay />

        <Container className="relative z-10 flex min-h-[calc(100svh-var(--si-header-h))] flex-col justify-end pb-16 pt-24 sm:pb-20">
          <Eyebrow onInk>Sunny Island · Classic Gold</Eyebrow>

          {/* The LCP element: real text, painted server-side, never
              transparent. Solid line + one hollow-stroke line — the
              film-overlay type signature. */}
          <h1 className="mt-5 max-w-[34rem] font-display text-hero tracking-hero text-on-ink">
            Caribbean heat,
            <span className="si-hollow block">made for tables</span>
            and shelves.
          </h1>

          <p className="mt-7 max-w-[44ch] text-lede text-on-ink-muted">
            Scotch bonnet, green papaya, and a family recipe carried five
            generations from St.&nbsp;Vincent to
            Trinidad&nbsp;&amp;&nbsp;Tobago.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={CTA.href} size="lg" variant="outline">
              {CTA.label}
            </Button>
            <TextLink href="/story" onInk>
              The story
            </TextLink>
          </div>
        </Container>
      </section>

      {/* Proof rail — approved claims only. */}
      <div className="si-grain relative border-y border-ink-line bg-ink py-6">
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

      {/* Interlude — the sunset still, complete: the band takes its height
          from the artwork's own ratio, so nothing is ever cropped away. */}
      <FullBleedBand media={ART.sunsetJars} />

      {/* ── V. TRADE ───────────────────────────────────────────────── */}
      <Trade />
    </>
  );
}
