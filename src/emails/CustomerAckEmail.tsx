import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import type { BuyerType, Inquiry } from "@/lib/inquiries/schema";
import * as t from "./theme";

export interface CustomerAckEmailProps {
  inquiry: Inquiry;
  reference: string;
  replyTo: string;
}

/** What we actually commit to, per path. Deliberately free of invented SLAs. */
const NEXT_STEPS: Record<BuyerType, { lede: string; steps: string[] }> = {
  consumer: {
    lede: "Thanks for reaching out about Sunny Island Pepper Sauce. Your request is with us and a real person will read it.",
    steps: [
      "We'll confirm what's available in the sizes you asked about.",
      "We'll come back with pricing and how to get it to you — pickup, delivery, or shipping.",
      "If you're ordering for an event or a recurring need, we'll work out timing with you.",
    ],
  },
  wholesale: {
    lede: "Thanks for your interest in carrying Sunny Island Pepper Sauce. Wholesale inquiries go straight to the team.",
    steps: [
      "We'll review the territory and volume you described.",
      "We'll send available formats, case configuration, and lead times.",
      "If you asked for samples, we'll confirm where to send them.",
    ],
  },
  retail: {
    lede: "Thanks for considering Sunny Island Pepper Sauce for your shelves. Retail inquiries go straight to the team.",
    steps: [
      "We'll review your store type, count, and launch window.",
      "We'll send the product details a buyer needs to make a decision.",
      "If you asked for a sample or a buyer packet, we'll confirm where to send it.",
    ],
  },
  other: {
    lede: "Thanks for getting in touch about working together.",
    steps: [
      "We'll read through what you proposed.",
      "We'll come back to you on whether it's a fit and what a next step looks like.",
    ],
  },
  feedback: {
    lede: "Thank you for taking the time to tell us what you think — genuinely. Small producers live on this.",
    steps: [
      "Your note goes to the people who actually make the sauce.",
      "If you asked something that needs an answer, we'll reply directly.",
    ],
  },
};

export function CustomerAckEmail({
  inquiry,
  reference,
  replyTo,
}: CustomerAckEmailProps) {
  const { lede, steps } = NEXT_STEPS[inquiry.buyerType];
  const firstName = inquiry.name.split(" ")[0];

  return (
    <Html lang="en">
      <Head />
      <Preview>{`We've got your inquiry — reference ${reference}`}</Preview>
      <Body style={t.body}>
        <Container style={t.card}>
          {/* Cinematic header, matching the site's dark hero */}
          <Section
            style={{
              backgroundColor: t.color.ink,
              padding: "36px 28px 30px",
              textAlign: "center" as const,
            }}
          >
            <Text
              style={{
                ...t.eyebrow,
                color: t.color.gold,
                margin: "0 0 10px 0",
              }}
            >
              Sunny Island Pepper Sauce
            </Text>
            <Heading
              as="h1"
              style={{
                ...t.heading,
                color: t.color.cream,
                fontSize: "30px",
                lineHeight: "36px",
                margin: 0,
              }}
            >
              We&rsquo;ve got it, {firstName}.
            </Heading>
            <Text style={{ ...t.referenceChip, marginTop: "18px" }}>
              {reference}
            </Text>
          </Section>

          <Section style={{ padding: "28px 28px 0" }}>
            <Text style={t.paragraph}>{lede}</Text>

            <Text
              style={{ ...t.eyebrow, color: t.color.goldDim, marginTop: "4px" }}
            >
              What happens next
            </Text>
            {steps.map((s, idx) => (
              <Section key={s} style={{ marginBottom: "12px" }}>
                <Text
                  style={{
                    ...t.paragraph,
                    margin: 0,
                    paddingLeft: "30px",
                    position: "relative" as const,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block" as const,
                      width: "20px",
                      marginLeft: "-30px",
                      marginRight: "10px",
                      color: t.color.ember,
                      fontFamily: t.font.mono,
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {s}
                </Text>
              </Section>
            ))}
          </Section>

          {/* Quote their own message back — proves it arrived intact */}
          <Section style={{ padding: "8px 28px 0" }}>
            <Hr style={t.hr} />
            <Text style={{ ...t.eyebrow, color: t.color.goldDim }}>
              What you sent us
            </Text>
            <Section
              style={{
                backgroundColor: "#FBF9F5",
                borderLeft: `3px solid ${t.color.gold}`,
                borderRadius: "0 8px 8px 0",
                padding: "14px 16px",
              }}
            >
              <Text
                style={{ ...t.paragraph, margin: 0, whiteSpace: "pre-wrap" }}
              >
                {inquiry.message}
              </Text>
            </Section>
          </Section>

          <Section style={{ padding: "22px 28px 0" }}>
            <Text style={t.paragraph}>
              Need to add something? Just reply to this email — it reaches us
              directly, and quoting{" "}
              <span style={{ fontFamily: t.font.mono, color: t.color.ink }}>
                {reference}
              </span>{" "}
              keeps it on the same thread.
            </Text>
          </Section>

          {/* Brand sign-off, drawn from the message printed on the label */}
          <Section
            style={{
              backgroundColor: t.color.ink,
              padding: "26px 28px",
              marginTop: "22px",
              textAlign: "center" as const,
            }}
          >
            <Text
              style={{
                fontFamily: t.font.display,
                fontSize: "17px",
                lineHeight: "27px",
                color: t.color.cream,
                fontStyle: "italic" as const,
                margin: "0 0 10px 0",
              }}
            >
              &ldquo;Your well-being is your greatest treasure; health,
              happiness and self-care are your compass to a fulfilled life.
              Prioritize them fearlessly.&rdquo;
            </Text>
            <Text style={{ ...t.eyebrow, color: t.color.goldDim, margin: 0 }}>
              A message from the Feracho Brand
            </Text>
          </Section>

          <Section
            style={{ padding: "20px 28px 26px", textAlign: "center" as const }}
          >
            <Text style={t.footerText}>
              Five generations. St. Vincent to Trinidad &amp; Tobago, now in the
              United States.
            </Text>
            <Text style={t.footerText}>
              <Link
                href={`mailto:${replyTo}`}
                style={{ color: t.color.ember, textDecoration: "none" }}
              >
                {replyTo}
              </Link>
              {"  ·  "}
              <Link
                href="https://www.instagram.com/sunnyislandpepper"
                style={{ color: t.color.ember, textDecoration: "none" }}
              >
                @sunnyislandpepper
              </Link>
            </Text>
          </Section>
        </Container>

        <Text
          style={{
            ...t.footerText,
            textAlign: "center" as const,
            maxWidth: `${t.MAX_WIDTH}px`,
            margin: "16px auto 0",
          }}
        >
          You received this because you submitted an inquiry at
          sunnyislandpepper.com. This is a one-time confirmation, not a
          subscription.
        </Text>
      </Body>
    </Html>
  );
}

export default CustomerAckEmail;
