import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { ART, FullBleedGround } from "@/components/media/FullBleed";
import {
  Lines,
  MotionRefresh,
  Settle,
} from "@/components/motion/Reveal.client";
import { recipes } from "@/content/recipes";

export const metadata: Metadata = {
  title: "Recipes — six Trinidad & Tobago house dishes",
  description:
    "Doubles, curry chicken with buss-up-shut, chicken pelau, callaloo, corn soup, and pepper shrimp — the house recipes, written the family way.",
  alternates: { canonical: "/recipes" },
};

/**
 * The recipe index as an editorial contents page — six dishes, each a
 * spread. Type-led by design: per-dish photography is on the commission
 * list, and the design accepts it later without rework.
 */
export default function RecipesPage() {
  return (
    <>
      <MotionRefresh />

      <section className="si-grain relative isolate overflow-hidden bg-ink py-section-tight">
        {/* Illustrated island scenery — decorative ground only, never
            captioned as a real place (docs/image-manifest.md). */}
        <FullBleedGround media={ART.islandScenery} opacity={38} />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/35"
        />
        <div aria-hidden className="si-rake absolute inset-0" />
        <Container className="relative">
          <Eyebrow onInk>House recipes</Eyebrow>
          <Lines
            as="h1"
            className="mt-6 max-w-[10ch] font-display text-display-xl text-on-ink"
          >
            Six dishes. One jar.
          </Lines>
          <Settle className="mt-8">
            <p className="max-w-[52ch] text-lede text-on-ink-muted">
              Our takes on the Trinidad &amp; Tobago classics, written the way
              the family cooks them — and the moments the sauce belongs in each
              pot.
            </p>
          </Settle>
        </Container>
      </section>

      <section className="bg-cream py-section-tight text-on-cream">
        <Container>
          <ol className="divide-y divide-cream-line border-y border-cream-line">
            {recipes.map((r, i) => (
              <li key={r.slug}>
                <Link
                  href={`/recipes/${r.slug}`}
                  className="group/dish grid gap-2 py-8 transition-colors duration-fast ease-si hover:bg-cream-raised sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-8 sm:px-4"
                >
                  <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-display tracking-display text-on-cream transition-colors duration-fast ease-si group-hover/dish:text-ember">
                      {r.title}
                    </span>
                    <span className="mt-2 block max-w-measure text-[0.9375rem] text-on-cream-muted">
                      {r.intro.split(". ")[0]}.
                    </span>
                  </span>
                  <span className="text-sm text-on-cream-muted sm:text-right">
                    {r.serves.split("—")[0].trim()}
                    <span className="mt-1 block">{r.totalTime}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
