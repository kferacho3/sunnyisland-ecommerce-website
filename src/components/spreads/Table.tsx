import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { Lines, Settle } from "@/components/motion/Reveal.client";
import { TextLink } from "@/components/core/Button";
import { recipes } from "@/content/recipes";

/**
 * SPREAD IV — THE TABLE. The six Trinidad & Tobago house recipes as an
 * editorial index — type-led by design, since per-dish photography is on the
 * commission list. The two AI food tiles appear small and captioned; they are
 * garnish, never heroes.
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
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>The table</Eyebrow>
            <Lines
              as="h2"
              className="mt-6 max-w-[12ch] font-display text-display-xl text-on-cream"
            >
              Cook it the Trini way.
            </Lines>
          </div>
          <Settle>
            <TextLink href="/recipes">All six house recipes</TextLink>
          </Settle>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          {/* The index — dish names at display scale, the house entrance. */}
          <ol className="divide-y divide-cream-line border-y border-cream-line">
            {[...featured, ...rest].map((r, i) => (
              <li key={r.slug}>
                <Link
                  href={`/recipes/${r.slug}`}
                  className="group/dish flex items-baseline gap-6 py-6 transition-colors duration-fast ease-si hover:bg-cream-raised sm:gap-10 sm:px-4"
                >
                  <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-title tracking-display text-on-cream transition-colors duration-fast ease-si group-hover/dish:text-ember">
                      {r.title}
                    </span>
                    <span className="mt-1 block text-sm text-on-cream-muted">
                      {r.dish} · {r.totalTime}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="self-center font-body text-on-cream-muted transition-transform duration-medium ease-si group-hover/dish:translate-x-1 group-hover/dish:text-ember"
                  >
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Serving-suggestion tiles — modest, matted, captioned. */}
          <div className="flex flex-col gap-8 lg:pt-4">
            {(
              [
                { src: "/brand/concept/ways-to-use-1.webp", rotate: "-1.1deg" },
                { src: "/brand/concept/ways-to-use-2.webp", rotate: "0.9deg" },
              ] as const
            ).map((t, i) => (
              <Settle key={t.src} delay={i * 0.08}>
                <figure
                  className="si-plate mx-auto rounded-sm"
                  style={{ rotate: t.rotate }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={t.src}
                      alt="A spread of Caribbean dishes arranged around a jar of Sunny Island Pepper Sauce."
                      fill
                      sizes="(max-width: 1024px) 70vw, 340px"
                      className="si-media object-cover"
                    />
                  </div>
                  <figcaption>Serving suggestion</figcaption>
                </figure>
              </Settle>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
