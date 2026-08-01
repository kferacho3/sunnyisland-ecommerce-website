import { createHash } from "node:crypto";

/**
 * Rate limiting.
 *
 * The previous implementation kept a module-level object keyed on the caller's
 * own email address, reset on every cold start, and incremented before the send
 * was attempted. It stopped nobody.
 *
 * This is honest about its limits: in-memory, per-instance, best-effort. It
 * raises the cost of casual abuse and nothing more. A durable implementation
 * needs a shared store; `createLimiter` is the seam for that.
 */

export interface LimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

interface Bucket {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const buckets = new Map<string, Bucket>();

/** Bound memory — a lambda instance should never accumulate unbounded keys. */
const MAX_KEYS = 5_000;

export function hashIdentifier(...parts: (string | undefined)[]): string {
  return createHash("sha256")
    .update(parts.filter(Boolean).join("|"))
    .digest("hex")
    .slice(0, 32);
}

export function checkRateLimit(
  identifier: string,
  now: number = Date.now(),
  max: number = MAX_PER_WINDOW,
): LimitResult {
  if (buckets.size > MAX_KEYS) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
    if (buckets.size > MAX_KEYS) buckets.clear();
  }

  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: max - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= max) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000),
      ),
    };
  }

  existing.count += 1;
  return { ok: true, remaining: max - existing.count, retryAfterSeconds: 0 };
}

/**
 * Idempotency: the same key within the window returns the original reference
 * instead of creating a second lead. Guards double-clicks and client retries.
 */
const seen = new Map<string, { reference: string; at: number }>();
const IDEMPOTENCY_TTL_MS = 10 * 60 * 1000;

export function recallIdempotent(
  key: string | undefined,
  now = Date.now(),
): string | undefined {
  if (!key) return undefined;
  const hit = seen.get(key);
  if (!hit) return undefined;
  if (now - hit.at > IDEMPOTENCY_TTL_MS) {
    seen.delete(key);
    return undefined;
  }
  return hit.reference;
}

export function rememberIdempotent(
  key: string | undefined,
  reference: string,
  now = Date.now(),
) {
  if (!key) return;
  if (seen.size > MAX_KEYS) seen.clear();
  seen.set(key, { reference, at: now });
}

/** Test seam. */
export function __resetLimiter() {
  buckets.clear();
  seen.clear();
}
