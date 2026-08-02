# Inquiry System

`POST /api/inquiries` — the site's single conversion action. Replaces the previous raw-SMTP handler,
which never delivered a message (`SMTP_HOST` was set to an email address, credentials were placeholders).

## Buyer paths

One Zod discriminated union on `buyerType`. Each path carries only its own fields.

| `buyerType` | Label | For |
|---|---|---|
| `consumer` | Direct Order | Individuals, events, markets, food trucks, gifting, recurring orders |
| `wholesale` | Wholesale Distribution | Distributors, brokers, food service, commercial kitchens |
| `retail` | Retail Partnership | Grocery, supermarket, Caribbean market, specialty, boutique |
| `other` | Other Partnership | Chef collaborations, sponsorships, everything else |
| `feedback` | Feedback | Customers telling you what they think |

`8oz` is the primary consumer SKU and appears first in every size list.

## Pipeline

```
validate (zod)
  → honeypot + minimum-submit-time
  → idempotency replay check
  → rate limit
  → persist lead            ← seam, see "Lead storage"
  → Resend → routed inbox   (internal notification)
  → Resend → submitter      (branded acknowledgement)
  → 200 { ok, reference }
```

Reference format: `SI-2026-4K7QM2` — Crockford base32, no ambiguous characters, safe to read aloud.

### Failure behaviour

| Condition | Response |
|---|---|
| Invalid fields | `422` with `fieldErrors` keyed by field name |
| Honeypot filled, or submitted in under 2s | `200` with a fake reference; nothing is sent |
| Over 5 submissions per hour per IP+email | `429` with `Retry-After` and a direct email address |
| Repeat `idempotencyKey` within 10 min | `200` with the original reference, `deduplicated: true` |
| `RESEND_API_KEY` / `INQUIRY_FROM` unset | `503` and a direct email address |
| Send fails and nothing was persisted | `502` and a direct email address |
| Anything else | `500`, generic. `err.message` is never returned to the client. |

The customer acknowledgement is never fatal — if it fails, the lead is already delivered internally and
the warning is logged.

## Environment

Copy `.env.example` to `.env.local`.

**Production is AWS Amplify Hosting behind CloudFront** (verified: responses
carry `x-amz-cf-id` and `via: … cloudfront.net`, and DNS is a CNAME to
`d1dhs3iq026j2p.cloudfront.net`). Not Vercel.

Set the values in the Amplify console, then note the platform gotcha below.

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | yes | Send-only key is correct and sufficient. Must be listed in `amplify.yml` |
| `INQUIRY_FROM` | yes | Must use a domain verified in Resend |
| `INQUIRY_TO_CONSUMER` | no | Defaults to `info@sunnyislandpepper.com` |
| `INQUIRY_TO_WHOLESALE` | no | Same default — split later without a code change |
| `INQUIRY_TO_RETAIL` | no | Same default |
| `INQUIRY_TO_OTHER` | no | Same default; also receives `feedback` |
| `DATABASE_URL` | no | When set, enables the lead store (not yet implemented) |

### ⚠️ Amplify: console variables do not reach the SSR runtime

Amplify injects environment variables into the **build container**, not into
the Next.js **compute** that serves requests. A server route reading
`process.env` at request time therefore sees `undefined`, and
`/api/inquiries` answers `503` even though the values are configured
correctly.

`amplify.yml` in the repo root fixes this by writing the named keys into
`.env.production` during the build, so Next bundles them into the server
output. After adding it, trigger a fresh deploy.

Verify from production without exposing anything:

```
curl -s https://www.sunnyislandpepper.com/api/health | jq
```

It reports presence and length per variable — never values.

### ⚠️ Domain verification is required before launch

`INQUIRY_FROM` currently uses `onboarding@resend.dev`. On that sender **Resend only delivers to the
account owner's address** (`info@sunnyislandpepper.com`). Internal notifications work; **customer
acknowledgements will fail for every real visitor** with:

> You can only send testing emails to your own email address.

To fix: verify `sunnyislandpepper.com` at <https://resend.com/domains>, add the DNS records it gives you,
then set `INQUIRY_FROM="Sunny Island Pepper Sauce <hello@sunnyislandpepper.com>"`.

## Lead storage

`persistLead()` in `src/lib/inquiries/service.ts` is a deliberate seam and **currently returns `false`**.

The design rule is persist-before-notify so a mail outage never loses a lead. No database is provisioned,
so rather than pretend, the system is explicit: `persisted: false` is returned, a warning is logged, and
the internal email carries a visible red note saying the email is the only record of that inquiry.

Wire it to Postgres and the note disappears on its own. Until then, **do not delete inquiry emails** —
they are the system of record.

## Rate limiting

In-memory, per-instance, best effort. Honest about its limits: it raises the cost of casual abuse and
nothing more. A serverless deployment runs many instances, each with its own counter, and all counters
reset on cold start. Durable limiting needs the same shared store as the lead persistence.

This is still a large improvement on the previous implementation, which keyed on the caller's own email
address and incremented before the send was attempted.

## Emails

`src/emails/`, built with React Email. Tokens in `theme.ts` are literal values, not CSS custom properties
— email clients do not support the latter. Georgia stands in for Fraunces; do not add a webfont.

**`InternalInquiryEmail`** — what the business receives. Header band is gold for wholesale and retail,
ember for everything else, so priority reads at a glance on a phone. Tappable email and phone, a details
table that omits empty rows entirely, the message quoted, a pre-filled reply button, and an attribution
footer with source, UTM, referrer, and timestamp. `replyTo` is the submitter, so replying just works.

**`CustomerAckEmail`** — what the visitor receives. Dark cinematic header matching the site, the reference,
numbered next-steps written per buyer path with no invented SLAs, their own message quoted back as proof
it arrived intact, and a sign-off using the wellness message printed on the physical label. `replyTo` is
the business inbox.

## Verified

Exercised against the live Resend API on 2026-08-01:

- All five buyer types accepted; ten emails (5 internal + 5 acknowledgements) accepted by Resend
- Validation returns per-field errors, including the consent message
- Honeypot returns a plausible success without sending
- Sub-2s submission returns a plausible success without sending
- Rate limiter allows 5 then returns `429`
- CRLF in `name` and `company` is stripped before reaching a header
- `GET` returns `405`
- `npm run build` passes

Not verified: final inbox delivery (the send-only API key cannot list messages) and the Postgres path
(not implemented).
