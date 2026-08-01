import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import { BUYER_LABELS, type Inquiry } from "@/lib/inquiries/schema";
import { previewFor, priorityFor } from "@/lib/inquiries/routing";
import * as t from "./theme";

export interface InternalInquiryEmailProps {
  inquiry: Inquiry;
  reference: string;
  receivedAt: string;
  persisted: boolean;
}

/** Rows whose value is empty are dropped rather than rendered blank. */
type Field = [label: string, value: string | undefined | null];

function fieldsFor(i: Inquiry): Field[] {
  const yes = (b: boolean) => (b ? "Yes" : undefined);
  const list = (a: readonly string[]) => (a.length ? a.join(", ") : undefined);
  const title = (s: string) =>
    s.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

  switch (i.buyerType) {
    case "consumer":
      return [
        ["Sizes wanted", list(i.sizes)],
        ["Quantity", i.quantity],
        ["Use", i.useCase && title(i.useCase)],
        ["Needed by", i.neededBy],
        ["Fulfilment", title(i.fulfilment)],
        ["Recurring order", yes(i.recurring)],
      ];
    case "wholesale":
      return [
        ["Company", i.company],
        ["Role", i.role],
        ["Website", i.website],
        ["Business type", title(i.businessType)],
        ["Territory", i.territory],
        ["Estimated first order", i.firstOrder],
        ["Monthly volume", i.monthlyVolume],
        ["Formats", list(i.formats)],
        ["Sample requested", yes(i.sampleRequest)],
        ["Target start", i.startDate],
      ];
    case "retail":
      return [
        ["Retailer", i.retailer],
        ["Buyer role", i.buyerRole],
        ["Website", i.website],
        ["Store type", title(i.storeType)],
        ["Store count", i.storeCount],
        ["Locations", i.locations],
        ["SKUs of interest", list(i.skus)],
        ["Launch window", i.launchWindow],
        ["Opening order", i.openingOrder],
        ["Buyer packet requested", yes(i.packetRequest)],
      ];
    case "other":
      return [
        ["Organisation", i.organisation],
        ["Partnership type", i.partnershipType],
      ];
    case "feedback":
      return [
        [
          "Rating",
          i.rating
            ? `${"★".repeat(i.rating)}${"☆".repeat(5 - i.rating)}  ${i.rating}/5`
            : undefined,
        ],
        ["Where purchased", i.purchasedAt],
      ];
  }
}

export function InternalInquiryEmail({
  inquiry,
  reference,
  receivedAt,
  persisted,
}: InternalInquiryEmailProps) {
  const high = priorityFor(inquiry) === "high";
  const accent = high ? t.color.gold : t.color.ember;
  const fields = fieldsFor(inquiry).filter(([, v]) => v != null && v !== "");

  const attribution: Field[] = [
    ["Source", inquiry.source],
    ["Landing page", inquiry.landingPage],
    ["Referrer", inquiry.referrer],
    ["UTM source", inquiry.utmSource],
    ["UTM medium", inquiry.utmMedium],
    ["UTM campaign", inquiry.utmCampaign],
  ].filter(([, v]) => v != null && v !== "") as Field[];

  return (
    <Html lang="en">
      <Head />
      <Preview>{`${BUYER_LABELS[inquiry.buyerType]} — ${previewFor(inquiry)}`}</Preview>
      <Body style={t.body}>
        <Container style={t.card}>
          {/* Header band — colour signals priority at a glance on a phone */}
          <Section
            style={{ backgroundColor: t.color.ink, padding: "26px 28px 22px" }}
          >
            <Row>
              <Column>
                <Text
                  style={{
                    ...t.eyebrow,
                    color: accent,
                    margin: 0,
                  }}
                >
                  {high ? "Business inquiry" : "New inquiry"}
                </Text>
                <Heading
                  as="h1"
                  style={{
                    ...t.heading,
                    color: t.color.cream,
                    fontSize: "24px",
                    lineHeight: "30px",
                    margin: "6px 0 0 0",
                  }}
                >
                  {BUYER_LABELS[inquiry.buyerType]}
                </Heading>
              </Column>
              <Column align="right" style={{ verticalAlign: "top" }}>
                <Text style={t.referenceChip}>{reference}</Text>
              </Column>
            </Row>
            <Text
              style={{
                ...t.footerText,
                color: t.color.muted,
                margin: "14px 0 0 0",
              }}
            >
              {previewFor(inquiry)}
            </Text>
          </Section>

          {/* Contact — the block the owner acts on */}
          <Section style={{ padding: "24px 28px 4px" }}>
            <Text style={t.label}>From</Text>
            <Text
              style={{
                ...t.value,
                fontSize: "19px",
                fontWeight: 600,
                marginBottom: "10px",
              }}
            >
              {inquiry.name}
            </Text>

            <Row>
              <Column>
                <Text style={t.label}>Email</Text>
                <Text style={{ ...t.value, marginBottom: "12px" }}>
                  <Link
                    href={`mailto:${inquiry.email}`}
                    style={{ color: t.color.ember, textDecoration: "none" }}
                  >
                    {inquiry.email}
                  </Link>
                </Text>
              </Column>
              {inquiry.phone ? (
                <Column>
                  <Text style={t.label}>Phone</Text>
                  <Text style={{ ...t.value, marginBottom: "12px" }}>
                    <Link
                      href={`tel:${inquiry.phone.replace(/[^\d+]/g, "")}`}
                      style={{ color: t.color.ember, textDecoration: "none" }}
                    >
                      {inquiry.phone}
                    </Link>
                  </Text>
                </Column>
              ) : null}
            </Row>

            <Row>
              <Column>
                <Text style={t.label}>Prefers</Text>
                <Text style={{ ...t.value, marginBottom: "12px" }}>
                  {inquiry.preferredContact === "either"
                    ? "Either"
                    : inquiry.preferredContact === "phone"
                      ? "Phone"
                      : "Email"}
                </Text>
              </Column>
              {inquiry.region ? (
                <Column>
                  <Text style={t.label}>Region</Text>
                  <Text style={{ ...t.value, marginBottom: "12px" }}>
                    {inquiry.region}
                  </Text>
                </Column>
              ) : null}
            </Row>
          </Section>

          {fields.length > 0 ? (
            <>
              <Section style={{ padding: "0 28px" }}>
                <Hr style={t.hr} />
                <Text style={{ ...t.eyebrow, color: t.color.goldDim }}>
                  Details
                </Text>
              </Section>
              <Section style={{ padding: "0 28px" }}>
                {fields.map(([k, v]) => (
                  <Row key={k} style={{ marginBottom: "12px" }}>
                    <Column
                      style={{
                        width: "42%",
                        verticalAlign: "top",
                        paddingRight: "12px",
                      }}
                    >
                      <Text style={t.label}>{k}</Text>
                    </Column>
                    <Column style={{ verticalAlign: "top" }}>
                      <Text style={t.value}>{v}</Text>
                    </Column>
                  </Row>
                ))}
              </Section>
            </>
          ) : null}

          {/* Their message, quoted */}
          <Section style={{ padding: "4px 28px 0" }}>
            <Hr style={t.hr} />
            <Text style={{ ...t.eyebrow, color: t.color.goldDim }}>
              Message
            </Text>
            <Section
              style={{
                backgroundColor: "#FBF9F5",
                borderLeft: `3px solid ${accent}`,
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

          {/* Reply CTA */}
          <Section
            style={{ padding: "22px 28px 4px", textAlign: "center" as const }}
          >
            <Link
              href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Re: [${reference}] Sunny Island Pepper Sauce`)}`}
              style={t.button}
            >
              Reply to {inquiry.name.split(" ")[0]}
            </Link>
          </Section>

          {/* Attribution + provenance */}
          <Section style={{ padding: "18px 28px 26px" }}>
            <Hr style={t.hr} />
            {attribution.map(([k, v]) => (
              <Text key={k} style={t.footerText}>
                <span style={{ color: "#B4B8B9" }}>{k}: </span>
                {v}
              </Text>
            ))}
            <Text style={{ ...t.footerText, marginTop: "8px" }}>
              <span style={{ color: "#B4B8B9" }}>Received: </span>
              {receivedAt}
            </Text>
            {!persisted ? (
              <Text
                style={{
                  ...t.footerText,
                  marginTop: "12px",
                  color: t.color.maroon,
                  fontWeight: 600,
                }}
              >
                ⚠ Not written to a lead store — DATABASE_URL is unset, so this
                email is the only record of this inquiry.
              </Text>
            ) : null}
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
          Sunny Island Pepper Sauce · sunnyislandpepper.com
        </Text>
      </Body>
    </Html>
  );
}

export default InternalInquiryEmail;
