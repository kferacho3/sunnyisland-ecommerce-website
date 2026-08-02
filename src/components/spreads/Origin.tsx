import { Fact } from "@/components/content/Fact";
import { Container } from "@/components/core/Container";
import { Eyebrow } from "@/components/core/Section";
import { ClipHandoff, Lines, Settle } from "@/components/motion/Reveal.client";
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
      <section id="origin" className="relative overflow-hidden py-section">
        <Container>
          <Eyebrow>Our origin</Eyebrow>

          <Lines
            as="h2"
            className="mt-6 max-w-[12ch] font-display text-display-xl text-on-cream"
          >
            Five generations. One recipe.
          </Lines>

          <Fact claim={story.origin}>
            {(text) => (
              <Settle className="mt-10">
                <p className="max-w-[46ch] font-display text-lede italic leading-relaxed text-on-cream-muted [font-variation-settings:var(--si-voice-quote)]">
                  &ldquo;{text}&rdquo;
                </p>
              </Settle>
            )}
          </Fact>

          <ol className="mt-20 grid gap-px overflow-hidden rounded-lg border border-cream-line bg-cream-line md:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <li key={t.when} className="bg-cream-raised p-7">
                <Settle delay={i * 0.06}>
                  <span className="font-mono text-eyebrow font-semibold text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-heading tracking-display text-on-cream">
                    {t.when}
                  </h3>
                  <p className="mt-1 font-body text-eyebrow font-semibold uppercase text-ember">
                    {t.where}
                  </p>
                  <p className="mt-3 text-[0.9375rem] text-on-cream-muted">
                    {t.what}
                  </p>
                </Settle>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </ClipHandoff>
  );
}
