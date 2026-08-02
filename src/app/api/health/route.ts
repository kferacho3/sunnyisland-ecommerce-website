import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Deployment diagnostic.
 *
 * Reports whether each required variable is VISIBLE TO THE SERVER RUNTIME —
 * booleans and lengths only, never a value, never a prefix. This exists
 * because "the keys are set" and "the running server can read them" are
 * different claims on Amplify: console variables reach the build container but
 * do not automatically reach the SSR compute, which is exactly how a correctly
 * configured project still answers 503.
 */
export async function GET() {
  const required = ["RESEND_API_KEY", "INQUIRY_FROM"] as const;
  const optional = [
    "INQUIRY_TO_CONSUMER",
    "INQUIRY_TO_WHOLESALE",
    "INQUIRY_TO_RETAIL",
    "INQUIRY_TO_OTHER",
    "DATABASE_URL",
    "NEXT_PUBLIC_SITE_URL",
  ] as const;

  const report = (keys: readonly string[]) =>
    Object.fromEntries(
      keys.map((k) => {
        const v = process.env[k];
        return [
          k,
          { present: Boolean(v?.trim()), length: v?.trim().length ?? 0 },
        ];
      }),
    );

  const req = report(required);
  const ready = Object.values(req).every((r) => r.present);

  return NextResponse.json(
    {
      ready,
      inquiriesWillWork: ready,
      required: req,
      optional: report(optional),
      runtime: process.env.NEXT_RUNTIME ?? "nodejs",
      node: process.version,
      hint: ready
        ? "Server can read the required variables."
        : "The SSR runtime cannot read these. On Amplify, console variables reach the build container but not the compute — amplify.yml writes them into .env.production at build time. Redeploy after adding it.",
    },
    { status: ready ? 200 : 503 },
  );
}
