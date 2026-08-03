import type { Metadata } from "next";

import { Container } from "@/components/core/Container";
import { Eyebrow, Section } from "@/components/core/Section";
import { Fact } from "@/components/content/Fact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How Sunny Island Pepper Sauce approaches accessibility, what is done, what is not, and how to reach us about it.",
  alternates: { canonical: "/accessibility" },
};

const DONE = [
  "Semantic landmarks and a skip link on every page.",
  "One H1 per page, with headings in order.",
  "Full keyboard access to navigation, the inquiry form, and the film's pause control.",
  "A visible focus ring on every interactive element.",
  "Touch targets of at least 44×44px.",
  "Reduced-motion support: the hero film does not load, the product viewer does not load, and transitions are removed.",
  "The background film has a pause control and does not autoplay under Save-Data.",
  "The 3D product viewer is decorative — every product fact is in normal HTML, and rotation is never required.",
  "Form errors are tied to their fields and summarised at the top of the form.",
  "Text and interface colours are checked against WCAG 2.2 AA contrast.",
  "Automated WCAG checks (axe, via Lighthouse) score 100 on every page, on both desktop and a throttled mobile device.",
  "No page scrolls sideways at 390px, and every page has exactly one H1.",
];

const NOT_YET = [
  "A full screen-reader pass on every page by a professional tester. Automated checks catch perhaps a third of real barriers; they are not a substitute for this.",
  "Formal testing at 200% zoom on every breakpoint.",
  "Captioning — the background film has no speech or meaningful audio, so it carries no captions.",
];

export default function AccessibilityPage() {
  return (
    <>
      <section className="si-grain relative isolate overflow-hidden bg-ink py-section-tight">
        <div aria-hidden className="si-rake absolute inset-0" />
        <Container className="relative">
          <Eyebrow onInk>Accessibility</Eyebrow>
          <h1 className="mt-5 max-w-[20ch] text-display tracking-display text-on-ink">
            Everyone should be able to use this.
          </h1>
        </Container>
      </section>

      <Section width="narrow">
        <p className="text-lede text-on-cream">
          We build against WCAG 2.2 Level AA. This page says what that actually
          means here, including the parts we have not finished — a checklist
          nobody has verified is not an accessibility statement.
        </p>

        <h2 className="mt-14 font-display text-title tracking-display text-on-cream">
          What is in place
        </h2>
        <ul className="mt-6 space-y-3">
          {DONE.map((d) => (
            <li
              key={d}
              className="flex gap-4 text-[0.9375rem] text-on-cream-muted before:mt-[0.7em] before:h-px before:w-4 before:flex-none before:bg-ember before:content-['']"
            >
              {d}
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-title tracking-display text-on-cream">
          What is not done yet
        </h2>
        <ul className="mt-6 space-y-3">
          {NOT_YET.map((d) => (
            <li
              key={d}
              className="flex gap-4 text-[0.9375rem] text-on-cream-muted before:mt-[0.7em] before:h-px before:w-4 before:flex-none before:bg-on-cream-muted before:content-['']"
            >
              {d}
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-title tracking-display text-on-cream">
          Something not working?
        </h2>
        <Fact claim={site.email}>
          {(email) => (
            <p className="mt-6 text-[0.9375rem] text-on-cream-muted">
              Email{" "}
              <a
                href={`mailto:${email}?subject=Accessibility`}
                className="text-ember underline underline-offset-4"
              >
                {email}
              </a>{" "}
              and tell us what happened and what you were using. If something on
              this site blocks you from getting in touch, that is a bug on our
              side, and we would rather hear about it than not.
            </p>
          )}
        </Fact>
      </Section>
    </>
  );
}
