import Image from "next/image";

import { Fact } from "@/components/content/Fact";
import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { IngredientBanner } from "@/components/marketing/IngredientBanner";
import { SpreadMark } from "@/components/marketing/SpreadMark";
import { Formation } from "@/components/motion/Formation.client";
import { Lines, Settle } from "@/components/motion/Reveal.client";
import { TextLink } from "@/components/core/Button";
import { product } from "@/content/product";
import { story } from "@/content/story";

/** Ingredients the frieze has no drawn glyph for; named in type instead. */
const NO_GLYPH = ["Vinegar", "Yellow Mustard", "Salt"];

/**
 * SPREAD III — CRAFT. A drawn frieze of what goes in the jar — scotch
 * bonnets, onion, garlic, green papaya — with no text. The landing page shows
 * the ingredients rather than reciting them; the written statement stays where
 * a buyer actually needs it (the printed label, and /sauce).
 *
 * Then the archive plates: the ten real kitchen photographs as small,
 * duotoned, captioned evidence. Phone photos rendered large read cheap;
 * rendered as archive material they read as provenance.
 */

const PLATES = [
  { n: 1, caption: "The licensed kitchen — prep bench" },
  { n: 3, caption: "Batch day — peppers in" },
  { n: 5, caption: "The pot, mid-run" },
  { n: 7, caption: "Filling, by hand" },
  { n: 9, caption: "Walk-in, stocked" },
  { n: 10, caption: "End of a run" },
] as const;

export function Craft() {
  return (
    <section
      id="craft"
      className="si-anvil si-wallpaper si-grain relative overflow-hidden border-t border-cream-line bg-cream-sunk py-section text-on-cream"
    >
      <Container className="relative">
        <SpreadMark numeral="III" label="Craft" />
        <Lines
          as="h2"
          className="mt-9 max-w-[16ch] font-display text-display tracking-display text-on-cream"
        >
          Short list. Long answer.
        </Lines>
      </Container>

      {/* Spacing was mt-20 / mt-24 around this band on top of py-section, which
          put roughly 500px of undifferentiated black between a headline saying
          "short list" and the first sentence of the spread. */}
      <IngredientBanner className="relative mt-12" />

      {/* The three ingredients with no drawn glyph, so the list the headline
          promises is actually complete. Claim-backed like the frieze. */}
      <Container className="relative">
        <Fact claim={product.ingredients}>
          {(all) => (
            <p className="mt-6 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-on-cream-muted">
              Also: {all.filter((i) => NO_GLYPH.includes(i)).join(" · ")}
            </p>
          )}
        </Fact>

        <div className="mt-14 grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div>
            <Eyebrow>Where it&rsquo;s made</Eyebrow>
            <Fact claim={story.facility}>
              {(text) => (
                <Settle className="mt-6">
                  <p className="max-w-measure text-lede text-on-cream-muted">
                    {text}
                  </p>
                </Settle>
              )}
            </Fact>
            <Settle className="mt-8" delay={0.08}>
              <TextLink href="/story#production">How a batch happens</TextLink>
            </Settle>
          </div>

          {/* Archive plates — the honest contact sheet. */}
          {/* Reduced motion: the archive contact sheet is fully visible and
              still, with its hand-set plate rotations intact. */}
          <Formation className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {PLATES.map((p, i) => (
              <div key={p.n} data-formation-item>
                <figure
                  className="si-plate"
                  style={{
                    rotate: `${(i % 3) - 1 === 0 ? 0.9 : ((i % 3) - 1) * 1.2}deg`,
                  }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={`https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/explore/locations/locations${p.n}.webp`}
                      alt={p.caption}
                      fill
                      sizes="(max-width: 640px) 44vw, 180px"
                      className="object-cover [filter:url(#si-archive)]"
                    />
                  </div>
                  <figcaption>{p.caption}</figcaption>
                </figure>
              </div>
            ))}
          </Formation>
        </div>
      </Container>
    </section>
  );
}
