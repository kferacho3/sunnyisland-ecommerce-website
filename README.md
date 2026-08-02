# Sunny Island Pepper Sauce

Inquiry-first brand site. Next.js 15 (App Router) · React 19 · Tailwind ·
GSAP · React Three Fiber.

## Deployment

**AWS Amplify Hosting**, served through CloudFront. Verified from response
headers (`x-amz-cf-id`, `via: … cloudfront.net`) and DNS
(`www` → `d1dhs3iq026j2p.cloudfront.net`).

`amplify.yml` in the repo root defines the build. It exists because Amplify
injects environment variables into the build container but **not** into the
Next.js SSR compute — so it writes the named keys into `.env.production` at
build time. Without it, `/api/inquiries` returns `503` even when every value
is set correctly in the console.

Check what the running server can actually see:

```bash
curl -s https://www.sunnyislandpepper.com/api/health | jq
```

Presence and length only — never values.

## Local

```bash
npm install --legacy-peer-deps   # RC peer pins in the R3F stack
cp .env.example .env.local       # then fill in RESEND_API_KEY
npm run dev
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (runs lint + typecheck) |
| `node scripts/qa-capture.mjs <url> <out.png> [w] [h] [anchor] [settleMs] [scrollPx]` | Screenshot QA with real scrolling |

`GET /api/preview-email` renders the customer acknowledgement in the browser
(dev only; 404s in production).

## Documentation

| Doc | Contents |
|---|---|
| `docs/design/2026-08-02-creative-direction.md` | The design system and page architecture |
| `docs/design/2026-08-02-research-audit.md` | Reference research behind it |
| `docs/content-truth-ledger.md` | Every claim, its evidence, and its status |
| `docs/image-manifest.md` | Per-image usage rules |
| `docs/inquiry-system.md` | The inquiry pipeline |

## Content integrity

Every displayed fact is a `Claim<T>` (`src/content/claim.ts`): `approved` with
a recorded source, or `pending`, which renders nothing. Components accept only
`Claim<T>`, so an unverified value cannot reach the DOM. Product facts come
from the physical label, not from memory.
