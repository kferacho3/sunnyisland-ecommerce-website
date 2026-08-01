import { Resend } from "resend";

import { CustomerAckEmail } from "@/emails/CustomerAckEmail";
import { InternalInquiryEmail } from "@/emails/InternalInquiryEmail";
import { generateReference } from "./reference";
import { inboxFor, subjectFor } from "./routing";
import type { Inquiry } from "./schema";

export interface SubmitResult {
  reference: string;
  persisted: boolean;
  internalSent: boolean;
  acknowledgementSent: boolean;
  /** Non-fatal problems worth logging or alerting on. */
  warnings: string[];
}

export class InquiryConfigError extends Error {}
export class InquiryDeliveryError extends Error {}

function requiredEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) throw new InquiryConfigError(`${name} is not set`);
  return v;
}

/**
 * Durable lead store.
 *
 * The spec's rule is persist-before-notify, so a mail outage never loses a lead.
 * No database is provisioned yet, so this is the seam: when DATABASE_URL is set,
 * implement `persistLead` against it and `persisted` becomes true. Until then the
 * route reports `persisted: false` and the internal email says so in the footer,
 * rather than quietly pretending there is a record.
 */
async function persistLead(
  _inquiry: Inquiry,
  _reference: string,
): Promise<boolean> {
  if (!process.env.DATABASE_URL?.trim()) return false;
  // Intentionally not implemented against an unprovisioned database.
  // See docs/superpowers/specs — PR 6 wires this to Postgres.
  return false;
}

let client: Resend | null = null;
function resend(): Resend {
  if (!client) client = new Resend(requiredEnv("RESEND_API_KEY"));
  return client;
}

const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "America/New_York",
});

export async function submitInquiry(inquiry: Inquiry): Promise<SubmitResult> {
  const from = requiredEnv("INQUIRY_FROM");
  const to = inboxFor(inquiry.buyerType);
  const reference = generateReference();
  const warnings: string[] = [];

  // 1. Persist first.
  const persisted = await persistLead(inquiry, reference);
  if (!persisted) {
    warnings.push(
      "No lead store configured — the notification email is the only record.",
    );
  }

  const receivedAt = `${formatter.format(new Date())} ET`;

  // 2. Notify the business. This one is fatal if it fails and nothing was stored.
  let internalSent = false;
  try {
    const { error } = await resend().emails.send({
      from,
      to: [to],
      replyTo: inquiry.email,
      subject: subjectFor(inquiry, reference),
      react: InternalInquiryEmail({
        inquiry,
        reference,
        receivedAt,
        persisted,
      }),
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
    internalSent = true;
  } catch (cause) {
    if (!persisted) {
      throw new InquiryDeliveryError(
        `Failed to deliver inquiry ${reference}: ${cause instanceof Error ? cause.message : "unknown"}`,
      );
    }
    warnings.push(
      `Internal notification failed for ${reference}; lead is stored.`,
    );
  }

  // 3. Acknowledge the customer. Never fatal — the lead is already captured.
  let acknowledgementSent = false;
  try {
    const { error } = await resend().emails.send({
      from,
      to: [inquiry.email],
      replyTo: to,
      subject: `We've got your inquiry — ${reference}`,
      react: CustomerAckEmail({ inquiry, reference, replyTo: to }),
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
    acknowledgementSent = true;
  } catch (cause) {
    warnings.push(
      `Acknowledgement to ${inquiry.email} failed: ${cause instanceof Error ? cause.message : "unknown"}`,
    );
  }

  return { reference, persisted, internalSent, acknowledgementSent, warnings };
}
