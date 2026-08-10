import Link from "next/link";

import { Container } from "@/components/core/Container";
import { DishMark } from "@/components/marketing/DishMark";
import { SpreadMark } from "@/components/marketing/SpreadMark";
import { Formation } from "@/components/motion/Formation.client";
import { Settle } from "@/components/motion/Reveal.client";
import { SlicedHeading } from "@/components/motion/SlicedHeading.client";
import { TextLink } from "@/components/core/Button";
import { recipes } from "@/content/recipes";

/**
 * SPREAD IV — THE TABLE. The six Trinidad & Tobago house recipes as an
 * editorial index — type-led by design, since per-dish photography is on the
 * commission list. No generated food imagery: the recipes are real
 * first-party content and they are the only thing here that has to be.
 */

const FEATURED = ["doubles-slight-pepper", "chicken-pelau", "pepper-shrimp"];

export function Table() {
  const featured = recipes.filter((r) => FEATURED.includes(r.slug));
  const rest = recipes.filter((r) => !FEATURED.includes(r.slug));

  return (
    <section
      id="table"
      className="si-forge relative bg-cream py-section text-on-cream"
    >
      <Container>
        {/* Its own full-width row, matching Origin/Craft/Trade. Previously the
            SpreadMark sat in a shrink-to-fit flex item, which collapsed its
            flex-1 hairline to ~16px — one spread out of five with a visibly
            different folio. */}
        <SpreadMark numeral="IV" label="The table" />

        <div className="mt-12 border-y border-cream-line py-10 sm:py-14">
          <SlicedHeading>Cook it the Trini way.</SlicedHeading>
        </div>

        {/* The index is the spread, at full container width. It used to share
            the row with two 340px "serving suggestion" tiles rendered from
            ways-to-use-{1,2}.webp — generated food mandalas of tacos,
            carbonara, a cheeseburger, loaded fries and breaded fish, ringed by
            eight disembodied hands, around a jar that is not the shipping SKU.
            Placed beside the words COOK IT THE TRINI WAY and an index of
            doubles, pelau and pepper shrimp, they contradicted the spread they
            decorated. A caption does not make a fabricated image true, so they
            are gone; the six real first-party recipes carry this alone. */}
        <div className="mt-16 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-[38ch] text-lede text-on-cream-muted">
            Six house recipes from Trinidad &amp; Tobago, written down as they
            are actually cooked.
          </p>
          <Settle>
            <TextLink href="/recipes">All six house recipes</TextLink>
          </Settle>
        </div>

        {/* THREE FEATURED, then the rest as an index.
            All six used to render as identical full-width rows, which gave the
            spread no focal point and — on a page arguing "cook it the Trini
            way" — showed no food whatsoever. Each dish now carries its own
            drawn plate (see DishMark), so the spread reads as a menu rather
            than a table of contents.
            Reduced motion: every card and row renders assembled and legible in
            document order. */}
        <Formation
          as="ol"
          className="mt-10 grid gap-px border border-cream-line bg-cream-line md:grid-cols-3"
        >
          {featured.map((r, i) => (
            <li key={r.slug} data-formation-item className="bg-cream">
              <Link
                href={`/recipes/${r.slug}`}
                prefetch={false}
                className="group/dish flex h-full flex-col gap-5 p-7 transition-colors duration-fast ease-si hover:bg-cream-raised"
              >
                <div className="flex items-start justify-between gap-4">
                  <DishMark
                    slug={r.slug}
                    className="h-[4.5rem] w-[4.5rem] shrink-0 transition-transform duration-medium ease-si group-hover/dish:scale-[1.04] sm:h-20 sm:w-20"
                  />
                  <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-balance font-display text-[clamp(1.25rem,1rem+0.9vw,1.625rem)] leading-title tracking-display text-on-cream transition-colors duration-fast ease-si group-hover/dish:text-ember">
                  {r.title}
                </h3>
                <p className="flex-1 text-[0.9375rem] leading-[1.6] text-on-cream-muted">
                  {r.intro.split(". ")[0]}.
                </p>
                <span className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-on-cream-muted">
                  {r.totalTime}
                </span>
              </Link>
            </li>
          ))}
        </Formation>

        <ol className="divide-y divide-cream-line border-x border-b border-cream-line">
          {rest.map((r, i) => (
            <li key={r.slug}>
              <Link
                href={`/recipes/${r.slug}`}
                prefetch={false}
                className="group/dish flex items-center gap-5 px-5 py-5 transition-colors duration-fast ease-si hover:bg-cream-raised sm:gap-7 sm:px-7"
              >
                <DishMark
                  slug={r.slug}
                  plate={false}
                  className="h-9 w-9 shrink-0 opacity-80 transition-opacity duration-fast ease-si group-hover/dish:opacity-100"
                />
                <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                  {String(featured.length + i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex-1 text-balance font-display text-[clamp(1.0625rem,0.95rem+0.5vw,1.25rem)] leading-title tracking-display text-on-cream transition-colors duration-fast ease-si group-hover/dish:text-ember">
                  {r.title}
                </h3>
                {/* Capped: totalTime runs to "About 3 hours, plus an overnight
                    soak for the channa", which unconstrained stretches back
                    across the row and crowds the dish name. */}
                <span className="hidden max-w-[13rem] text-right font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em] text-on-cream-muted sm:block">
                  {r.totalTime}
                </span>
                <span
                  aria-hidden
                  className="text-[1.125rem] leading-none text-on-cream-muted transition-transform duration-medium ease-si group-hover/dish:translate-x-1 group-hover/dish:text-ember"
                >
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
