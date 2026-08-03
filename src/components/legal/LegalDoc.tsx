import { Container } from "@/components/core/Container";
import { Eyebrow, Section } from "@/components/core/Section";

/**
 * Shared shell for the two legal documents.
 *
 * Deliberately plain: no table of contents, no scroll-spy, no client
 * JavaScript. The pages the legacy site had were client components running a
 * section observer to highlight a sidebar, which is a lot of machinery for a
 * document people arrive at, search with ⌘F, and leave.
 *
 * Sections render as real <h2>s with stable ids so a specific clause can be
 * linked to directly.
 */

export interface LegalSection {
  id: string;
  title: string;
  /** Paragraphs. Strings render as prose; arrays render as a bulleted list. */
  body: (string | string[])[];
}

export function LegalDoc({
  eyebrow,
  title,
  lede,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="si-grain relative isolate overflow-hidden bg-ink py-section-tight">
        <div aria-hidden className="si-rake absolute inset-0" />
        <Container className="relative">
          <Eyebrow onInk>{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-[20ch] text-display tracking-display text-on-ink">
            {title}
          </h1>
          <p className="mt-6 font-body text-sm uppercase tracking-[0.14em] text-on-ink-muted">
            Last updated {updated}
          </p>
        </Container>
      </section>

      <Section width="narrow">
        <p className="text-lede text-on-cream">{lede}</p>

        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-header">
            <h2 className="mt-14 font-display text-title tracking-display text-on-cream">
              {s.title}
            </h2>
            {s.body.map((block, i) =>
              Array.isArray(block) ? (
                <ul key={i} className="mt-6 space-y-3">
                  {block.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 text-[0.9375rem] text-on-cream-muted before:mt-[0.7em] before:h-px before:w-4 before:flex-none before:bg-ember before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  key={i}
                  className="mt-6 text-[0.9375rem] text-on-cream-muted"
                >
                  {block}
                </p>
              ),
            )}
          </section>
        ))}
      </Section>
    </>
  );
}
