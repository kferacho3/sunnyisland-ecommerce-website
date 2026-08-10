import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { DishMark } from "@/components/marketing/DishMark";
import { ART, FullBleedGround } from "@/components/media/FullBleed";
import { Formation } from "@/components/motion/Formation.client";
import { MotionRefresh, Settle } from "@/components/motion/Reveal.client";
import { recipes } from "@/content/recipes";

export const metadata: Metadata = {
  title: "Recipes — six Trinidad & Tobago house dishes",
  description:
    "Doubles, curry chicken with buss-up-shut, chicken pelau, callaloo, corn soup, and pepper shrimp — the house recipes, written the family way.",
  alternates: { canonical: "/recipes" },
};

/**
 * The recipe index.
 *
 * Was an <ol> of six full-width rows: identical weight, display-sized titles
 * over 15px muted intros, and a quarter of the page left as empty ground below
 * the last row. Six dishes rendered as six lines of contents is the shape of a
 * legal document, not a food collection — and for a brand whose whole argument
 * is "cook it the Trini way", the page showed no food at all.
 *
 * Now a card grid, each dish carrying its own drawn plate (see DishMark) so the
 * six are told apart by sight before they are read. Titles come down, intros
 * come up, and the page closes on the jar instead of on nothing.
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
          {/* Above-fold LCP text is server-rendered in its final state. Lines
              cannot render h1 by design, so SplitText never rewrites it. */}
          <h1 className="mt-6 max-w-[10ch] font-display text-display-xl text-on-ink">
            Six dishes. One jar.
          </h1>
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
          {/* Reduced motion: every card renders assembled, in document order. */}
          <Formation
            as="ol"
            className="grid gap-px border border-cream-line bg-cream-line sm:grid-cols-2 xl:grid-cols-3"
          >
            {recipes.map((r, i) => (
              <li key={r.slug} data-formation-item className="bg-cream">
                <Link
                  href={`/recipes/${r.slug}`}
                  className="group/dish flex h-full flex-col gap-6 p-7 transition-colors duration-fast ease-si hover:bg-cream-raised sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <DishMark
                      slug={r.slug}
                      className="h-20 w-20 shrink-0 transition-transform duration-medium ease-si group-hover/dish:scale-[1.04] sm:h-24 sm:w-24"
                    />
                    <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h2 className="text-balance font-display text-[clamp(1.375rem,1.05rem+1.1vw,1.75rem)] leading-title tracking-display text-on-cream transition-colors duration-fast ease-si group-hover/dish:text-ember">
                      {r.title}
                    </h2>
                    {/* Up from 0.9375rem. This is the line that has to sell the
                        dish; it was set smaller than the metadata beside it. */}
                    <p className="mt-3 flex-1 text-[1rem] leading-[1.6] text-on-cream-muted">
                      {r.intro.split(". ")[0]}.
                    </p>

                    <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-cream-line pt-4">
                      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-on-cream-muted">
                        {r.serves.split("—")[0].trim()} · {r.totalTime}
                      </span>
                      <span
                        aria-hidden
                        className="text-[1.125rem] leading-none text-on-cream-muted transition-transform duration-medium ease-si group-hover/dish:translate-x-1 group-hover/dish:text-ember"
                      >
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </Formation>
        </Container>
      </section>

      {/* The page used to end on ~900px of empty ground. It ends on the jar. */}
      <section className="si-anvil border-t border-ink-line bg-ink py-section-tight text-center text-on-ink">
        <Container>
          <h2 className="mx-auto max-w-[18ch] font-display text-title tracking-display text-on-ink">
            Every one of them wants the same jar.
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-on-ink-muted">
            One sauce, six pots. Tell us what you need and a person answers.
          </p>
          <Link
            href="/inquire"
            className="mt-9 inline-flex min-h-[3.25rem] items-center bg-gold px-7 font-body font-semibold text-ink transition-colors duration-fast ease-si hover:bg-ember hover:text-on-ink"
          >
            Inquire for sauce
          </Link>
        </Container>
      </section>
    </>
  );
}
