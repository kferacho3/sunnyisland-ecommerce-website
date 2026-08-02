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
      <MotionRefresh />

      {/* ── I. ARRIVAL ─────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-var(--si-header-h))] overflow-hidden bg-ink">
        <ArrivalRelay />

        <Container className="relative z-10 flex min-h-[calc(100svh-var(--si-header-h))] max-w-container flex-col justify-end pb-16 pt-24 sm:pb-20">
          <Eyebrow onInk>Sunny Island · Classic Gold</Eyebrow>

          {/* The LCP element: real text, painted server-side, never
              transparent. Solid line + one hollow-stroke line — the
              film-overlay type signature. */}
          <h1 className="mt-5 max-w-[30rem] font-display text-hero tracking-hero text-on-ink lg:max-w-[34rem]">
            Caribbean heat,
            <span className="si-hollow block">made for tables</span>
            and shelves.
          </h1>

          <p className="mt-6 max-w-[38ch] text-lede text-on-ink-muted">
            Scotch bonnet, green papaya, and a family recipe carried five
            generations from St.&nbsp;Vincent to
            Trinidad&nbsp;&amp;&nbsp;Tobago.
          </p>

          {/* The fast lane. Anyone with a real brief still gets the
              adaptive form at the foot of the page. */}
          <Suspense fallback={null}>
            <QuickInquiry className="mt-9 max-w-[34rem]" />
          </Suspense>
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

      {/* ── V. TRADE ───────────────────────────────────────────────── */}
      <Trade />
    </>
  );
}
