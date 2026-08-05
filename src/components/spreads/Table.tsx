import Link from "next/link";

import { Container } from "@/components/core/Container";
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

        {/* Reduced motion: all six index rows render assembled and legible in
            document order. */}
        <Formation
          as="ol"
          className="mt-10 divide-y divide-cream-line border-y border-cream-line"
        >
          {[...featured, ...rest].map((r, i) => (
            <li key={r.slug} data-formation-item>
              <Link
                href={`/recipes/${r.slug}`}
                prefetch={false}
                className="group/dish flex items-center gap-5 py-7 transition-colors duration-fast ease-si hover:bg-cream-raised sm:gap-10 sm:px-4"
              >
                <span className="font-mono text-eyebrow font-semibold text-gold-deep transition-colors duration-fast ease-si group-hover/dish:text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex-1 text-balance font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-title tracking-display text-on-cream transition-colors duration-fast ease-si group-hover/dish:text-ember">
                  {r.title}
                </h3>
                {/* Capped: totalTime runs to "About 3 hours, plus an overnight
                    soak for the channa", which unconstrained stretches back
                    across the row and crowds the dish name. */}
                <span className="hidden max-w-[13rem] text-right text-sm text-on-cream-muted sm:block">
                  {r.dish}
                  <span className="mt-0.5 block font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em]">
                    {r.totalTime}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-[1.25rem] leading-none text-on-cream-muted transition-transform duration-medium ease-si group-hover/dish:translate-x-1 group-hover/dish:text-ember"
                >
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </Formation>
      </Container>
    </section>
  );
}
