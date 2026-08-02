import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import type { BuyerType, Inquiry } from "@/lib/inquiries/schema";
import { emailAsset, emailLink } from "./assets";
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
          {/* Masthead — one composited image, full bleed across the card.
              The badge is baked into it rather than layered on top: Gmail
              strips the negative margin that would pull a separate mark up
              over the art, and Outlook ignores background-image entirely. */}
          <Section style={{ backgroundColor: t.color.ink, padding: 0 }}>
            <Img
              src={emailAsset.header}
              alt="Sunny Island Pepper Sauce"
              width="600"
              height="220"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "600px",
                height: "auto",
                border: 0,
              }}
            />
          </Section>

          <Section
            style={{
              backgroundColor: t.color.ink,
              padding: "30px 28px 34px",
              textAlign: "center" as const,
            }}
          >
            <Text
              style={{
                ...t.eyebrow,
                color: t.color.gold,
                margin: "0 0 12px 0",
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
            <Text style={{ ...t.referenceChip, marginTop: "20px" }}>
              {reference}
            </Text>
          </Section>

          <Section style={{ padding: "32px 28px 0" }}>
            <Text style={{ ...t.paragraph, marginBottom: "26px" }}>{lede}</Text>

            <Text
              style={{
                ...t.eyebrow,
                color: t.color.goldDim,
                margin: "0 0 14px 0",
              }}
            >
              What happens next
            </Text>

            {/* Two columns, spaced with cell padding rather than margin on the
                Row. Each Row is its own <table>, and tables do not honour
                margin reliably across clients — the previous marginBottom
                compounded with two stacked section paddings and the rule's own
                margin into a ~50px hole under the last step. Negative margins
                are avoided for the same reason Outlook needs the two columns:
                it drops them, which would collapse the number onto the copy. */}
            {steps.map((s, idx) => {
              const last = idx === steps.length - 1;
              const cell = {
                verticalAlign: "top" as const,
                paddingBottom: last ? "0" : "13px",
              };
              return (
                <Row key={s}>
                  <Column style={{ ...cell, width: "32px", paddingTop: "3px" }}>
                    <Text
                      style={{
                        fontFamily: t.font.mono,
                        fontSize: "12px",
                        fontWeight: 700,
                        color: t.color.ember,
                        margin: 0,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </Text>
                  </Column>
                  <Column style={cell}>
                    <Text style={{ ...t.paragraph, margin: 0 }}>{s}</Text>
                  </Column>
                </Row>
              );
            })}
          </Section>

          {/* Quote their own message back — proves it arrived intact. */}
          <Section style={{ padding: "0 28px" }}>
            <Hr style={{ ...t.hr, margin: "28px 0 22px" }} />
            <Text
              style={{
                ...t.eyebrow,
                color: t.color.goldDim,
                margin: "0 0 12px 0",
              }}
            >
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
            <Text style={{ ...t.paragraph, margin: 0 }}>
              Need to add something? Just reply to this email — it reaches us
              directly, and quoting{" "}
              <span style={{ fontFamily: t.font.mono, color: t.color.ink }}>
                {reference}
              </span>{" "}
              keeps it on the same thread.
            </Text>
          </Section>

          {/* Sign-off, using the wreath from the label and the message printed
              on every bottle. */}
          <Section
            style={{
              backgroundColor: t.color.ink,
              padding: "34px 28px 30px",
              marginTop: "26px",
              textAlign: "center" as const,
            }}
          >
            <Img
              src={emailAsset.ornament}
              alt=""
              width="96"
              height="96"
              style={{ display: "block", margin: "0 auto 18px", border: 0 }}
            />
            <Text
              style={{
                fontFamily: t.font.display,
                fontSize: "17px",
                lineHeight: "27px",
                color: t.color.cream,
                fontStyle: "italic" as const,
                margin: "0 0 12px 0",
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
            style={{ padding: "22px 28px 28px", textAlign: "center" as const }}
          >
            <Text style={{ ...t.footerText, marginBottom: "10px" }}>
              Five generations. St. Vincent to Trinidad &amp; Tobago, now in the
              United States.
            </Text>
            <Text style={{ ...t.footerText, marginBottom: "10px" }}>
              <Link
                href={emailLink.sauce}
                style={{ color: t.color.ember, textDecoration: "none" }}
              >
                The Sauce
              </Link>
              {"  ·  "}
              <Link
                href={emailLink.partners}
                style={{ color: t.color.ember, textDecoration: "none" }}
              >
                Partners
              </Link>
              {"  ·  "}
              <Link
                href={emailLink.story}
                style={{ color: t.color.ember, textDecoration: "none" }}
              >
                Our Story
              </Link>
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
                href={emailLink.instagram}
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
