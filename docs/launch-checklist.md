# Launch checklist

State of the rebuild as of 2 August 2026. Everything under "Verified" was
measured, not assumed — the command that produced each number is given so it
can be re-run.

---

## Blocking — owner action required

### 1. Redeploy on Amplify, then confirm the runtime can read the keys

The inquiry form returns **503** in production until this happens. The cause is
not a missing variable: Amplify console variables reach the _build container_
but not the _SSR compute_. `amplify.yml` writes them into `.env.production` at
build time, which is what fixes it — but that file only takes effect on a
deploy that runs it.

```bash
# after the deploy finishes
curl -s https://www.sunnyislandpepper.com/api/health | jq
```

Expect `"ready": true`. The endpoint reports presence and length only, never
values. If `ready` is false, the SSR runtime still cannot see
`RESEND_API_KEY` / `INQUIRY_FROM`.

### 2. Rotate credentials

`env.local` is tracked in git history from commit `2ffac2d` on a GitHub remote.
Everything in it should be treated as disclosed.

- **Revoke** — Eventbrite, Ticketmaster, SerpAPI, Pexels, Pixabay, Pinterest,
  reCAPTCHA. The features that used these are deleted; the keys have no
  remaining purpose.
- **Rotate** — `DATABASE_URL`, `NEXTAUTH_SECRET`, the Shopify Storefront token.
- Remove `env.local` from the repo and add it to `.gitignore`. Deleting the
  file does not remove it from history; the keys still need rotating.

### 3. Correct servings-per-container before any print run

The 2 / 16 / 32 / 64 oz labels all state **48 servings**. That is wrong by
roughly 4×–7× depending on size. This is a regulated declaration.

---

## Verified

### Lighthouse — all 9 pages

Mobile, Moto G4 emulation, 4× CPU throttle, slow 4G:

|                | min | max |
| -------------- | --- | --- |
| Performance    | 90  | 94  |
| Accessibility  | 100 | 100 |
| Best practices | 100 | 100 |
| SEO            | 100 | 100 |

Desktop preset: 99–100 across all four categories. CLS is 0 on every page
except the homepage (0.017, the hero film swapping in over its poster).

LCP sits around 3.3s on the throttled mobile profile. That is network-bound —
Total Blocking Time is 0ms on every page, so it is not JavaScript.

```bash
npx next build && npx next start -p 3100
CHROME_PATH="$(node -e "console.log(require('playwright').chromium.executablePath())")" \
  npx lighthouse@12 http://localhost:3100/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new --no-sandbox"
```

### Mobile structure at 390px

All 9 pages: no horizontal overflow, exactly one `<h1>`, no console errors, no
empty links, and every non-inline interactive target at least 44×44 CSS px.

### Redirects

17 rules, all 308, each confirmed to resolve to its intended destination. All
retired API routes return 404. See `next.config.ts`.

### Inquiry pipeline

Previously verified end-to-end against live Resend: all five buyer types
accepted, honeypot / timing / rate-limit / header-injection all behaving,
idempotency returning the original reference without a second send.

Re-verified after the step refactor: Continue fires **0** requests, Submit
fires exactly **1**, step-2 values survive into the payload, redirect to
thank-you works.

---

## Known and accepted

**Two `postcss` advisories** remain inside Next's own bundled copy
(`node_modules/next/node_modules/postcss`). They cannot be deduped from here.
Both require attacker-controlled CSS to enter the build; all CSS in this
project is first-party. npm's only offered remedy is downgrading Next to
9.3.3, which would be far worse. Revisit when Next ships a release that bumps
its bundled copy.

**Leads are not persisted.** `persistLead()` in `src/lib/inquiries/service.ts`
is a seam that returns `false`, and the internal notification email carries a
visible warning saying so. Every inquiry is delivered by email and nothing is
lost, but there is no database record. Wire `DATABASE_URL` and implement that
one function to change it.

**`/sauce` has no inline 3D.** `STAGE_3D_ENABLED` is `false`. The jar GLB's
label wrap shows its white interior on head-on views; re-export the model and
flip the flag.

**Legal copy needs counsel review.** `/legal/privacy` and `/legal/terms` were
rewritten to describe what the code actually does — one form, two processors
(Resend, AWS), no cookies, no tracking, no accounts, no payments. They are
accurate, but they are not a lawyer's work. Governing law and venue are
deliberately absent from the terms rather than invented.

---

## Not done

- A professional screen-reader pass. Automated checks catch roughly a third of
  real barriers.
- Formal 200% zoom testing at every breakpoint.
