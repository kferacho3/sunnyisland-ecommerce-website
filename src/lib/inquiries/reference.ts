import { randomUUID } from "node:crypto";

/**
 * Lead reference, e.g. `SI-2026-4K7QM2`.
 *
 * Shown to the visitor on the thank-you page and used as the subject prefix, so
 * a reply thread and a stored lead can always be tied together.
 *
 * Crockford base32 (no I, L, O, U) so a reference read aloud over the phone or
 * copied off a screen does not degrade.
 */
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export function generateReference(now: Date = new Date()): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);

  let suffix = "";
  for (const b of bytes) suffix += ALPHABET[b % ALPHABET.length];

  return `SI-${now.getUTCFullYear()}-${suffix}`;
}

export function generateIdempotencyKey(): string {
  return randomUUID();
}

const REFERENCE_RE = /^SI-\d{4}-[0-9A-HJKMNP-TV-Z]{6}$/;

export function isReference(value: string): boolean {
  return REFERENCE_RE.test(value);
}
