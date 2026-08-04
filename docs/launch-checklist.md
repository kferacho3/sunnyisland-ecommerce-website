# Launch checklist

State of the rebuild as of 2 August 2026. Everything under "Verified" was
measured, not assumed — the command that produced each number is given so it
can be re-run.

---

## Blocking — owner action required

### 1. ~~Amplify redeploy~~ — DONE, verified 2 Aug 2026

Amplify auto-builds on push to `main`, so the `amplify.yml` fix shipped with
the commits. Confirmed live:

```
GET /api/health  ->  {"ready": true, "inquiriesWillWork": true}
                     RESEND_API_KEY present (36 chars)
                     INQUIRY_FROM   present (26 chars)
```

End-to-end submission against production succeeded — reference
`SI-2026-GHDVT7`, acknowledgement sent. Replaying the same idempotency key
returned the same reference with `deduplicated: true` and sent no second
email. Honeypot and the too-fast-submit guard both return the sentinel
reference `SI-0000-000000`, which looks like success to a bot and sends
nothing.

Optional, not blocking: `INQUIRY_TO_CONSUMER` / `_WHOLESALE` / `_RETAIL` /
`_OTHER` are unset, so all five buyer types land in the `info@` fallback
inbox. Setting them in Amplify splits the routing — env change, no code
change. `NEXT_PUBLIC_SITE_URL` is also unset; it falls back to the correct
production origin, so canonical URLs and the sitemap are right either way.

### 2. Rotate credentials

**What is actually exposed.** Only one file: `env.local` — note the _missing
leading dot_. It has been tracked since `2ffac2d` and is on a GitHub remote,
so every value in it should be treated as public.

Two things make this less alarming than it looks, and one makes it worse:

- The app never read it. Next.js only auto-loads `.env*`; a dotless
  `env.local` is invisible to it. Nothing broke when it was untracked, and
  nothing depends on it.
- `.env.example` is tracked but genuinely contains placeholders
  (`re_xxxxxxxx…`), not live values. It is safe.
- `.env.local` — _with_ the dot — is the real local secrets file, and it is
  correctly untracked and ignored.

`git rm --cached env.local` has been done, so it stops being committed. **That
does not remove it from history.** The 19 values below are still recoverable
from any clone and must be dealt with individually.

**Revoke — delete these outright.** The features that used them are gone from
the codebase; the keys have no remaining purpose, so rotating them is wasted
effort.

| Key                                                                                                   | Where                             |
| ----------------------------------------------------------------------------------------------------- | --------------------------------- |
| `TICKETMASTER_API_KEY`                                                                                | Ticketmaster developer portal     |
| `EVENTBRITE_API_KEY`, `EVENTBRITE_CLIENT_ID`, `EVENTBRITE_CLIENT_SECRET`                              | Eventbrite → account → API keys   |
| `SERPAPI_API_KEY`                                                                                     | SerpApi dashboard                 |
| `NEXT_PUBLIC_PEXELS_API_KEY`                                                                          | Pexels API dashboard              |
| `NEXT_PUBLIC_PIXABAY_API_KEY`                                                                         | Pixabay account                   |
| `PINTEREST_ACCESS_TOKEN`, `NEXT_PUBLIC_PINTEREST_ACCESS_TOKEN`                                        | Pinterest developer app           |
| `RECAPTCHA_SECRET_KEY`, `RECAPTCHA_API_KEY`, `RECAPTCHA_PROJECT_ID`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google Cloud reCAPTCHA Enterprise |

The two `NEXT_PUBLIC_*` image keys are the most urgent of these: that prefix
means they were compiled into the browser bundle and served to every visitor,
so they were public long before the git history mattered.

**Rotate — these still guard something real.**

| Key                                           | Action                                                                                                                                                            |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                                | Change the database password and update it in Amplify. Currently set in production but unused — `persistLead()` is still a stub.                                  |
| `NEXTAUTH_SECRET`                             | The auth stack is deleted, so nothing signs sessions any more. Delete rather than rotate.                                                                         |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Revoke in Shopify → Apps → Develop apps. Storefront tokens are public-by-design and read-only, but this one now grants access to a store the site no longer uses. |
| `RESEND_API_KEY`                              | Not in `env.local` and not exposed — no action. Rotate only if it has been pasted into chat or a ticket.                                                          |

**Then, optionally, scrub history.** `git filter-repo --path env.local
--invert-paths` followed by a force-push rewrites every commit hash and
requires every clone to be re-cloned. Given the keys above are being revoked
anyway, this is belt-and-braces rather than necessary — revocation is what
actually removes the risk.

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

Lighthouse does not scroll. A green report therefore does not exercise the
below-fold `once` triggers, the IntersectionObserver-gated island/jar chunks,
the island pin, or scroll-time frame cost. Run `scripts/qa-scroll-metrics.mjs`
and `scripts/qa-landing-gates.mjs` against the production build before treating
the landing page as verified.

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
