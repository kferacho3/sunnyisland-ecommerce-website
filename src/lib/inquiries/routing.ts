import { BUYER_LABELS, type BuyerType, type Inquiry } from "./schema";

/**
 * Where each buyer type lands, and how the subject line reads.
 *
 * All four currently point at one inbox. Splitting them later is an env change,
 * not a code change.
 */

const FALLBACK_INBOX = "info@sunnyislandpepper.com";

const ENV_KEY: Record<BuyerType, string> = {
  consumer: "INQUIRY_TO_CONSUMER",
  wholesale: "INQUIRY_TO_WHOLESALE",
  retail: "INQUIRY_TO_RETAIL",
  other: "INQUIRY_TO_OTHER",
  feedback: "INQUIRY_TO_OTHER",
};

export function inboxFor(buyerType: BuyerType): string {
  return process.env[ENV_KEY[buyerType]]?.trim() || FALLBACK_INBOX;
}

/** Priority drives the colour of the header band in the internal email. */
export type Priority = "high" | "normal";

export function priorityFor(inquiry: Inquiry): Priority {
  return inquiry.buyerType === "wholesale" || inquiry.buyerType === "retail"
    ? "high"
    : "normal";
}

/**
 * Subject line. Built entirely server-side from a fixed vocabulary plus the
 * already-CR/LF-stripped name — no caller-supplied string reaches a header.
 */
export function subjectFor(inquiry: Inquiry, reference: string): string {
  const label = BUYER_LABELS[inquiry.buyerType];

  const who =
    inquiry.buyerType === "wholesale"
      ? inquiry.company
      : inquiry.buyerType === "retail"
        ? inquiry.retailer
        : inquiry.name;

  return `[${reference}] ${label} — ${who}`.slice(0, 180);
}

/** A short, human-readable summary used as the email preview text. */
export function previewFor(inquiry: Inquiry): string {
  switch (inquiry.buyerType) {
    case "consumer": {
      const sizes = inquiry.sizes.filter((s) => s !== "unsure").join(", ");
      return (
        [
          inquiry.quantity && `Qty ${inquiry.quantity}`,
          sizes && `Sizes: ${sizes}`,
          inquiry.recurring && "Recurring",
        ]
          .filter(Boolean)
          .join(" · ") || "New direct order inquiry"
      );
    }
    case "wholesale":
      return [
        inquiry.businessType.replace(/-/g, " "),
        inquiry.territory,
        inquiry.monthlyVolume && `~${inquiry.monthlyVolume}/mo`,
        inquiry.sampleRequest && "Sample requested",
      ]
        .filter(Boolean)
        .join(" · ");
    case "retail":
      return [
        inquiry.storeType.replace(/-/g, " "),
        inquiry.storeCount && `${inquiry.storeCount} stores`,
        inquiry.launchWindow,
        inquiry.packetRequest && "Buyer packet requested",
      ]
        .filter(Boolean)
        .join(" · ");
    case "feedback":
      return inquiry.rating
        ? `${inquiry.rating}/5 — feedback`
        : "Customer feedback";
    case "other":
      return inquiry.partnershipType || "Partnership inquiry";
  }
}
