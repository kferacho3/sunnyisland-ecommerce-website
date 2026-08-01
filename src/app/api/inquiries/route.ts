import { NextResponse, type NextRequest } from "next/server";

import {
  checkRateLimit,
  hashIdentifier,
  recallIdempotent,
  rememberIdempotent,
} from "@/lib/inquiries/rate-limit";
import {
  InquiryConfigError,
  InquiryDeliveryError,
  submitInquiry,
} from "@/lib/inquiries/service";
import { InquirySchema, MIN_ELAPSED_MS } from "@/lib/inquiries/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32 * 1024;

/** Generic success shape — bots learn nothing from the difference. */
function accepted(reference: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: true, reference, ...extra }, { status: 200 });
}

function clientIp(req: NextRequest): string | undefined {
  const fwd = req.headers.get("x-forwarded-for");
  return (
    fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined
  );
}

export async function POST(req: NextRequest) {
  // --- body size guard, before parsing -------------------------------------
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Request too large" },
      { status: 413 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // --- validate ------------------------------------------------------------
  const parsed = InquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_";
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }
  const inquiry = parsed.data;

  // --- silent bot rejection ------------------------------------------------
  // Honeypot filled, or submitted faster than a human can type. Return a
  // plausible success so the bot does not learn it was caught.
  const tooFast =
    inquiry.elapsedMs != null && inquiry.elapsedMs < MIN_ELAPSED_MS;
  if (inquiry.company_website !== "" || tooFast) {
    return accepted("SI-0000-000000");
  }

  // --- idempotency ---------------------------------------------------------
  const replay = recallIdempotent(inquiry.idempotencyKey);
  if (replay) return accepted(replay, { deduplicated: true });

  // --- rate limit ----------------------------------------------------------
  const identity = hashIdentifier(clientIp(req), inquiry.email);
  const limit = checkRateLimit(identity);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "You've sent several inquiries recently. Please email us directly instead.",
        contact: "info@sunnyislandpepper.com",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  // --- persist, notify, acknowledge ----------------------------------------
  try {
    const result = await submitInquiry(inquiry);
    rememberIdempotent(inquiry.idempotencyKey, result.reference);

    for (const w of result.warnings) {
      console.warn(`[inquiries] ${result.reference}: ${w}`);
    }

    return accepted(result.reference, {
      acknowledged: result.acknowledgementSent,
    });
  } catch (cause) {
    if (cause instanceof InquiryConfigError) {
      // Misconfiguration is ours, not the visitor's. Loud in logs, generic to them.
      console.error("[inquiries] configuration error:", cause.message);
      return NextResponse.json(
        {
          ok: false,
          error:
            "We can't accept inquiries right now. Please email us directly.",
          contact: "info@sunnyislandpepper.com",
        },
        { status: 503 },
      );
    }

    if (cause instanceof InquiryDeliveryError) {
      console.error("[inquiries] delivery failed:", cause.message);
      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't send your inquiry. Please email us directly so it isn't lost.",
          contact: "info@sunnyislandpepper.com",
        },
        { status: 502 },
      );
    }

    // Never leak err.message to the client — the old route did.
    console.error("[inquiries] unexpected error:", cause);
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong. Please try again or email us directly.",
        contact: "info@sunnyislandpepper.com",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed" },
    { status: 405 },
  );
}
