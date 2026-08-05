import Image from "next/image";

import { Fact } from "@/components/content/Fact";
import { Container } from "@/components/core/Container";
import { Formation } from "@/components/motion/Formation.client";
import { Settle } from "@/components/motion/Reveal.client";
import { SpreadMark } from "@/components/marketing/SpreadMark";
import { story } from "@/content/story";

/**
 * SPREAD II — ORIGIN. The claim, the evidence, the chronology.
 *
 * This spread used to state one fact five times: an <h2>, an SVG stencil
 * repeating that same <h2> 40px to its right, a blockquote, a photograph of a
 * label printing that same blockquote verbatim, and a timeline row. A page
 * that repeats one fact reads as a page with one fact, so the phrase now
 * appears exactly once here (the h2) and once in the proof rail.
 *
 * The right column holds the only genuine artifact we own — the printed label,
 * cropped to its masthead so it reads as evidence rather than as a second
 * printing of the quote beside it.
 */

/**
 * Chronology of the approved narrative in story.origin. Row 3 deliberately
 * does NOT repeat "five generations": the h2 owns that claim, and this row's
 * job is the part the h2 cannot carry — that it moved by hand, not in print.
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
    when: "Handed down",
    where: "One family",
    what: "Carried by memory, never written down — until now.",
  },
  {
    when: "Today",
    where: "United States",
    what: "The family recipe makes its American debut.",
  },
] as const;

export function Origin() {
  return (
    <section
      id="origin"
      className="si-forge si-grain relative border-t border-cream-line bg-cream py-section text-on-cream"
    >
      <Container>
        <SpreadMark numeral="II" label="Origin" />

        {/* The chapter opener runs full width at the same display rank as
            Craft, Table and Trade. It was previously a bespoke 4rem clamp
            inside a half-width column, which read as a lower rank than the
            spreads around it and flattened the page's hierarchy. */}
        <p className="mt-12 font-mono text-eyebrow font-semibold uppercase tracking-eyebrow text-ember">
          A recipe carried by memory
        </p>
        <h2 className="mt-5 max-w-[20ch] font-display text-display leading-display tracking-display">
          {/* Origin's one signature: live text with the flame gradient painted
              through it. Real selectable type — no SVG, no clipPath, no image,
              no ScrollTrigger. Both gradient stops clear AA on this ground. */}
          <span className="si-flame">Five generations.</span>
          <span className="block text-on-cream">One recipe.</span>
        </h2>

        <div className="mt-14 grid items-start gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <Settle>
            <Fact claim={story.origin}>
              {(text) => (
                <blockquote className="border-l border-gold pl-6">
                  <p className="max-w-[38ch] font-display text-lede italic leading-relaxed text-on-cream-muted [font-variation-settings:var(--si-voice-quote)]">
                    &ldquo;{text}&rdquo;
                  </p>
                  <footer className="mt-5 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-on-cream-muted">
                    Printed on the 16 oz label
                  </footer>
                </blockquote>
              )}
            </Fact>
          </Settle>

          {/* Evidence, not decoration — and the crop is load-bearing, not
              styling. label-masthead.webp is a purpose-built 800x400 cut of
              the top third of label-history-panel.webp, so two exclusions are
              baked into the ASSET rather than left to object-cover arithmetic
              that a future aspect-ratio edit could silently undo: the panel's
              middle reprints this very blockquote word for word, and its foot
              carries a "Recipe est. 1950s" seal contradicting the "early
              1900s" above it — which is why story.recipeDate is pending.
              Cropping first also took the file from 75 KB to 34 KB. */}
          <Settle>
            <figure className="border border-cream-line bg-cream-raised">
              <figcaption className="flex items-center justify-between border-b border-cream-line px-4 py-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                <span>Evidence 01</span>
                <span className="text-on-cream-muted">Printed archive</span>
              </figcaption>
              <div className="relative aspect-[2/1] overflow-hidden bg-ink">
                <Image
                  src="/brand/label-masthead.webp"
                  alt="The masthead of the printed Sunny Island Pepper Sauce label."
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="object-cover object-top"
                />
              </div>
              <p className="px-4 py-3 font-body text-[0.6875rem] uppercase tracking-[0.09em] text-on-cream-muted">
                From the printed 16 oz label
              </p>
            </figure>
          </Settle>
        </div>

        <div className="relative mt-20 border-y border-cream-line lg:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-cream-line px-5 py-8 sm:px-8 lg:px-0">
            <div>
              <p className="font-mono text-eyebrow font-semibold uppercase tracking-eyebrow text-ember">
                The family line
              </p>
              <h3 className="mt-3 font-display text-title tracking-display text-on-cream">
                Four chapters. One continuous recipe.
              </h3>
            </div>
            <p className="hidden font-mono text-eyebrow uppercase tracking-eyebrow text-on-cream-muted sm:block">
              1900s—Today
            </p>
          </div>

          {/* Reduced motion: the ledger renders fully assembled in document
              order, with every chapter already legible. */}
          <Formation as="ol" className="divide-y divide-cream-line">
            {TIMELINE.map((t, i) => (
              <li
                key={t.when}
                data-formation-item
                className="group/era relative grid gap-4 px-5 py-8 transition-colors duration-fast ease-si hover:bg-cream-raised sm:grid-cols-[3rem_12rem_1fr] sm:items-start sm:px-8 lg:px-0"
              >
                <span className="font-mono text-eyebrow font-semibold text-gold-deep transition-colors duration-fast ease-si group-hover/era:text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-display text-heading tracking-display text-on-cream">
                    {t.when}
                  </h4>
                  <p className="mt-1 font-body text-eyebrow font-semibold uppercase tracking-eyebrow text-ember">
                    {t.where}
                  </p>
                </div>
                <p className="max-w-[34ch] text-[0.9375rem] text-on-cream-muted sm:pt-1">
                  {t.what}
                </p>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-0 bg-ember transition-[width] duration-medium ease-si group-hover/era:w-full"
                />
              </li>
            ))}
          </Formation>
        </div>
      </Container>
    </section>
  );
}
