/**
 * Content truth.
 *
 * This site previously shipped four invented customer reviews — three flagged
 * `verified: true` — under a hardcoded 4.9-star, 120-review aggregate. That
 * happened because nothing in the codebase distinguished a verified fact from a
 * literal somebody typed.
 *
 * So the ledger is a type. Every displayed fact is a Claim<T>, the rendering
 * components accept nothing else, and `pending` renders nothing. Unknown values
 * are absent by construction rather than by discipline.
 *
 * Evidence lives in docs/content-truth-ledger.md.
 */

export interface Approved<T> {
  readonly status: "approved";
  readonly value: T;
  /** Where the fact comes from: label PDF, COA, invoice, registration number. */
  readonly source: string;
  readonly owner: string;
  /** ISO date the claim was last reviewed. */
  readonly reviewed: string;
}

export interface Pending {
  readonly status: "pending";
  /** What evidence would move this to approved. */
  readonly note: string;
}

export type Claim<T> = Approved<T> | Pending;

export const approved = <T>(
  value: T,
  source: string,
  owner = "Feracho Brand",
  reviewed = "2026-08-01",
): Approved<T> => ({ status: "approved", value, source, owner, reviewed });

export const pending = (note: string): Pending => ({
  status: "pending",
  note,
});

export const isApproved = <T>(claim: Claim<T>): claim is Approved<T> =>
  claim.status === "approved";

/** Value if approved, otherwise null. Prefer <Fact> in components. */
export const valueOf = <T>(claim: Claim<T>): T | null =>
  isApproved(claim) ? claim.value : null;

/** Keeps only the approved entries of a labelled list. */
export function approvedOnly<T>(
  rows: readonly { label: string; claim: Claim<T> }[],
): { label: string; value: T }[] {
  return rows.flatMap(({ label, claim }) =>
    isApproved(claim) ? [{ label, value: claim.value }] : [],
  );
}
