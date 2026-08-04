import Image from "next/image";

import { Fact } from "@/components/content/Fact";
import { Container } from "@/components/core/Container";
import { Formation } from "@/components/motion/Formation.client";
import { ClipHeadline } from "@/components/motion/ClipHeadline.client";
import { ClipHandoff, Settle } from "@/components/motion/Reveal.client";
import { SpreadMark } from "@/components/marketing/SpreadMark";
import { story } from "@/content/story";

/**
 * SPREAD II — ORIGIN. Ink yields to cream through the signature clip, and the
 * sauce narrates its own history in first person (La Revoltosa register — the
 * product speaks, so no people need inventing).
 */

const TIMELINE = [
  {
    when: "Early 1900s",
    where: "St. Vincent",
    what: "The recipe is born in a family kitchen.",
  },
  {
    when: "Mid-century",
    where: "Trinidad & Tobago",
    what: "Refined over decades of island tables.",
  },
  {
    when: "Five generations",
    where: "One family",
    what: "Handed down, never written down — until now.",
  },
  {
    when: "Today",
    where: "United States",
    what: "The family recipe makes its American debut.",
  },
] as const;

export function Origin() {
  return (
    <ClipHandoff className="bg-cream text-on-cream">
      <section
        id="origin"
        className="si-forge relative overflow-hidden py-section"
      >
        <Container>
          <SpreadMark numeral="II" label="Origin" />

          <div className="mt-9">
            <ClipHeadline />
          </div>

          <Fact claim={story.origin}>
            {(text) => (
              <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1fr_18rem] lg:gap-20">
                <Settle>
                  <p className="max-w-[46ch] font-display text-lede italic leading-relaxed text-on-cream-muted [font-variation-settings:var(--si-voice-quote)]">
                    &ldquo;{text}&rdquo;
                  </p>
                </Settle>

                <figure className="si-plate mx-auto w-full max-w-[18rem] lg:mx-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="/brand/label-history-panel.webp"
                      alt="History panel from the printed Sunny Island Pepper Sauce label."
                      fill
                      sizes="288px"
                      className="object-cover object-top"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-transparent to-cream-raised"
                    />
                  </div>
                  <figcaption>From the printed 16 oz label.</figcaption>
                </figure>
              </div>
            )}
          </Fact>

          {/* Reduced motion: the rail renders fully assembled in document
              order, with every node and fact in its final position. */}
          <Formation
            as="ol"
            className="relative mt-20 grid gap-10 border-l border-cream-line pl-8 md:grid-cols-4 md:gap-8 md:border-l-0 md:border-t md:pl-0"
          >
            {TIMELINE.map((t, i) => (
              <li key={t.when} data-formation-item className="relative md:pt-9">
                <span
                  aria-hidden
                  className="absolute -left-[2.48rem] top-1 h-[15px] w-[15px] border border-gold bg-cream md:-top-2 md:left-0"
                />
                <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-heading tracking-display text-on-cream">
                  {t.when}
                </h3>
                <p className="mt-1 font-body text-eyebrow font-semibold uppercase text-ember">
                  {t.where}
                </p>
                <p className="mt-3 max-w-[26ch] text-[0.9375rem] text-on-cream-muted">
                  {t.what}
                </p>
              </li>
            ))}
          </Formation>
        </Container>
      </section>
    </ClipHandoff>
  );
}
