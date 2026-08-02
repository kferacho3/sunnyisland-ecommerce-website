import Link from "next/link";

import { Fact } from "@/components/content/Fact";
import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { Lines, Settle } from "@/components/motion/Reveal.client";
import { story } from "@/content/story";

/**
 * SPREAD V — TRADE. The tasting-room close: inquiry as an appointment, not a
 * checkout. Three doors, each opening the form with the buyer preselected.
 * Ends on the wellness message printed on every bottle.
 */

const DOORS = [
  {
    title: "Direct Order",
    line: "Bottles for your table, your stall, or a room full of people.",
    href: "/inquire?buyer=consumer&source=home-trade",
  },
  {
    title: "Wholesale",
    line: "16 to 64 oz for distribution and food-service programs.",
    href: "/inquire?buyer=wholesale&source=home-trade",
  },
  {
    title: "Retail Partnership",
    line: "The 8 oz jar, on your shelf, with real provenance.",
    href: "/inquire?buyer=retail&source=home-trade",
  },
] as const;

export function Trade() {
  return (
    <section
      id="trade"
      className="si-grain relative isolate overflow-hidden bg-ink py-section text-on-ink"
    >
      <div aria-hidden className="si-rake absolute inset-0" />

      <Container className="relative">
        <Eyebrow onInk>Work with us</Eyebrow>
        <Lines
          as="h2"
          className="mt-6 max-w-[12ch] font-display text-display-xl text-on-ink"
        >
          Pull up a chair.
        </Lines>
        <Settle className="mt-8">
          <p className="max-w-[52ch] text-lede text-on-ink-muted">
            Tell us what you need and a person answers — no account, no cart, no
            autoresponder. Chefs and retailers welcome.
          </p>
        </Settle>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-ink-line bg-ink-line md:grid-cols-3">
          {DOORS.map((door, i) => (
            <Link
              key={door.title}
              href={door.href}
              className="group/door relative bg-ink-raised p-8 transition-colors duration-medium ease-si hover:bg-ink sm:p-10"
            >
              <Settle delay={i * 0.07}>
                <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-title tracking-display text-on-ink transition-colors duration-fast ease-si group-hover/door:text-gold">
                  {door.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] text-on-ink-muted">
                  {door.line}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-body text-[0.9375rem] font-semibold text-on-ink">
                  Start the conversation
                  <span
                    aria-hidden
                    className="transition-transform duration-medium ease-si group-hover/door:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </Settle>
            </Link>
          ))}
        </div>

        <Fact claim={story.wellnessMessage}>
          {(m) => (
            <Settle className="mx-auto mt-24 max-w-narrow text-center">
              <p className="font-display text-title leading-title tracking-display text-on-ink [font-variation-settings:var(--si-voice-quote)]">
                &ldquo;{m.quote}&rdquo;
              </p>
              <p className="mt-5 font-body text-eyebrow font-semibold uppercase text-gold-deep">
                {m.attribution}
              </p>
            </Settle>
          )}
        </Fact>
      </Container>
    </section>
  );
}
