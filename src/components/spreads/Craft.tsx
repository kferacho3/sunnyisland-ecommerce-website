import Image from "next/image";

import { Fact } from "@/components/content/Fact";
import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { IngredientBanner } from "@/components/marketing/IngredientBanner";
import { Lines, Settle } from "@/components/motion/Reveal.client";
import { TextLink } from "@/components/core/Button";
import { story } from "@/content/story";

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
      className="si-anvil relative overflow-hidden bg-cream-sunk py-section text-on-cream"
    >
      <Container>
        <Eyebrow>What&rsquo;s in the jar</Eyebrow>
        <Lines
          as="h2"
          className="mt-6 max-w-[16ch] font-display text-display tracking-display text-on-cream"
        >
          Short list. Long answer.
        </Lines>
      </Container>

      <IngredientBanner className="mt-14" />

      <Container>
        <div className="mt-20 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
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
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {PLATES.map((p, i) => (
              <Settle key={p.n} delay={i * 0.05}>
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
              </Settle>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
