import Image from "next/image";

import { Fact } from "@/components/content/Fact";
import { Container } from "@/components/core/Container";
import { Formation } from "@/components/motion/Formation.client";
import { ClipHeadline } from "@/components/motion/ClipHeadline.client";
import { Settle } from "@/components/motion/Reveal.client";
import { SpreadMark } from "@/components/marketing/SpreadMark";
import { story } from "@/content/story";

/**
 * SPREAD II — ORIGIN. Ink yields to a family archive: the clip-type stamp is
 * one artifact inside the story, not a full-viewport demo. The label becomes
 * evidence and the chronology reads as one provenance ledger.
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
    <section
      id="origin"
      className="si-forge relative overflow-hidden bg-cream py-section text-on-cream"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 h-[32rem] w-[32rem] rounded-full border border-cream-line opacity-60 sm:-right-12"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-40 h-[24rem] w-[24rem] rounded-full border border-cream-line opacity-50"
      />
      <Container>
        <SpreadMark numeral="II" label="Origin" />

        <div className="relative mt-12 grid items-end gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <Settle>
            <header className="max-w-[38rem]">
              <p className="font-mono text-eyebrow font-semibold uppercase text-ember">
                A recipe carried by memory
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.75rem,3.8vw,4rem)] leading-[0.98] tracking-[-0.02em] text-on-cream">
                Five generations.
                <span className="block text-gold-deep">One recipe.</span>
              </h2>
              <Fact claim={story.origin}>
                {(text) => (
                  <blockquote className="mt-8 border-l border-gold pl-6">
                    <p className="font-display text-lede italic leading-relaxed text-on-cream-muted [font-variation-settings:var(--si-voice-quote)]">
                      &ldquo;{text}&rdquo;
                    </p>
                  </blockquote>
                )}
              </Fact>
            </header>
          </Settle>

          <ClipHeadline />
        </div>

        <div className="relative mt-20 border-y border-cream-line lg:mt-28">
          <div className="grid lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]">
            <figure className="relative border-b border-cream-line p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="mb-5 flex items-center justify-between font-mono text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                <span>Evidence 01</span>
                <span>Printed archive</span>
              </div>
              <div className="si-plate mx-auto w-full max-w-[22rem]">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                  <Image
                    src="/brand/label-history-panel.webp"
                    alt="History panel from the printed Sunny Island Pepper Sauce label."
                    fill
                    sizes="(min-width: 1024px) 352px, 80vw"
                    className="origin-top scale-[1.4] object-cover object-top"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-transparent to-cream-raised"
                  />
                </div>
                <figcaption>From the printed 16 oz label.</figcaption>
              </div>
            </figure>

            <div className="lg:pl-12 xl:pl-16">
              <div className="flex items-end justify-between gap-6 border-b border-cream-line px-5 py-8 sm:px-8 lg:px-0 lg:pr-10">
                <div>
                  <p className="font-mono text-eyebrow font-semibold uppercase text-ember">
                    The family line
                  </p>
                  <h3 className="mt-3 font-display text-title tracking-display text-on-cream">
                    Four chapters. One continuous recipe.
                  </h3>
                </div>
                <p className="hidden font-mono text-eyebrow uppercase text-on-cream-muted sm:block">
                  1900s—Today
                </p>
              </div>

              {/* Reduced motion: the ledger renders fully assembled in
                    document order, with every chapter already legible. */}
              <Formation as="ol" className="divide-y divide-cream-line">
                {TIMELINE.map((t, i) => (
                  <li
                    key={t.when}
                    data-formation-item
                    className="group/era relative grid gap-4 px-5 py-8 transition-colors duration-fast ease-si hover:bg-cream-raised sm:grid-cols-[3rem_10rem_1fr] sm:items-start sm:px-8 lg:px-0 lg:pr-10"
                  >
                    <span className="font-mono text-eyebrow font-semibold text-gold-deep transition-colors duration-fast ease-si group-hover/era:text-ember">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="font-display text-heading tracking-display text-on-cream">
                        {t.when}
                      </h4>
                      <p className="mt-1 font-body text-eyebrow font-semibold uppercase text-ember">
                        {t.where}
                      </p>
                    </div>
                    <p className="max-w-[30ch] text-[0.9375rem] text-on-cream-muted sm:pt-1">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
