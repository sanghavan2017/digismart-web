# Operations, Environment & Integrations

## Environment variables (names only — never print/commit real values)
Configured in Vercel project settings and locally in `.env.local` (not committed; do not read this
file's contents when documenting):
- `ANTHROPIC_API_KEY` — used by `app/api/chat/route.ts` to call the Claude API for the chatbot.
- `RESEND_API_KEY` — used by `app/api/lead/route.ts` and `app/api/cron/weekly-leads/route.ts` to send transactional/report emails via Resend.
- `KV_REST_API_URL`, `KV_REST_API_TOKEN` — used by `lib/kv.ts` to talk to Vercel KV (Upstash Redis REST API) for lead storage. Vercel injects these automatically when a KV database is connected to the project.
- `CRON_SECRET` — checked as a bearer token by `app/api/cron/weekly-leads/route.ts` to reject unauthenticated calls; Vercel Cron sends this automatically for scheduled invocations configured in `vercel.json`.
- A YouTube Data API key is required by `app/api/cron/check-videos/route.ts` (see that file for the exact env var name) to list recent uploads.

## Vercel Cron jobs (`vercel.json`)
| Path | Schedule | Purpose |
|---|---|---|
| `/api/cron/check-videos` | `7 2 1 * *` (monthly) | Polls two hardcoded YouTube channel IDs (Mitsubishi Cleansui, Kitz Micro Filter Việt Nam) for videos published in the last 35 days and emails a report via Resend. |
| `/api/cron/weekly-leads` | `3 1 * * 1` (weekly, Monday) | Reads all leads from Vercel KV (`kvGetAllLeads`), filters to the last 7 days, and emails a digest via Resend. Requires `CRON_SECRET` bearer auth. |

Both jobs were verified passing on production per `DigiSmart_TrangThai_Roadmap.md`.

## Third-party integrations
- **Anthropic Claude** (`app/api/chat/route.ts`) — AI shopping assistant. System prompt is generated from live catalog/warranty data; see `domain/catalog-and-brands.md`.
- **Resend** (`app/api/lead/route.ts`, `app/api/cron/weekly-leads/route.ts`) — transactional email. ⚠️ **Resend is currently in test mode** (no verified sending domain), so lead emails only deliver to the one address registered on the Resend account (`digismart606@gmail.com`, hardcoded in `LEAD_RECIPIENTS` in `app/api/lead/route.ts`). To send to additional recipients, a domain must be verified at resend.com/domains first.
- **Vercel KV** (`lib/kv.ts`) — stores the last 500 leads as a Redis list (`leads` key) for the weekly digest cron and as a durability fallback if email delivery fails.
- **YouTube Data API** (`app/api/cron/check-videos/route.ts`) — polls brand channels for new videos.
- **Google Analytics (GA4)** — measurement ID `G-YNQSD9M50Q` is hardcoded in `app/layout.tsx` and injected directly into `<head>` via inline `<script>` tags (not `next/script`) specifically so Google Search Console can verify ownership through GA.
- **Google Search Console** — verified via GA for property `https://www.digismartvn.com/`. Note the **www vs non-www** decision below.
- **Schema.org JSON-LD** — `LocalBusiness` markup in `app/layout.tsx` (name, address, hours, phone), `Product` + `BreadcrumbList` markup on `app/san-pham/[id]/page.tsx`, `Article` markup on `/kien-thuc/[slug]` posts.

## Known operational caveats (check `DigiSmart_TrangThai_Roadmap.md` before "fixing")
- **Primary domain is intentionally `www.digismartvn.com`**, with the bare domain redirecting (308) to
  it. This adds ~0.9s latency only when a user types the bare domain directly; all real inbound links
  (Google/Facebook/Zalo/chatbot) already point to `www`. Switching primary domain was investigated and
  explicitly rejected because all SEO work (canonical tags, sitemap, GSC property, schema) is anchored
  to `www` and switching would lose Search Console history. Do not "fix" this without re-reading that
  investigation.
- **Several social/marketplace links are known placeholders/incorrect**: Shopee (`shopee.vn/digismart85`
  returns 404), Facebook (`facebook.com/digismartvn` vs `facebook.com/digismart606` used inconsistently
  between `Footer.tsx`/`ContactWidget.tsx`), TikTok handle. These appear in `components/Footer.tsx`,
  `app/lien-he/page.tsx`, `app/san-pham/[id]/page.tsx`, and `components/ContactWidget.tsx`. The roadmap
  doc notes these are pending correct links from the business owner and that when fixed, all instances
  should be consolidated into one constants file rather than fixed ad hoc in each component.
- **Kitz product photography gaps** — a few Kitz SKUs still use placeholder/mismatched imagery (see
  roadmap "Đang chặn" section) pending real photos from the business owner.

## Local dev environment quirk
The canonical repo working copy is synced via Google Drive (`G:\My Drive\Hoc AI\digismart-web`), which
corrupts `node_modules` under Drive's streaming sync — `npm install`/`next dev` cannot run reliably
directly from that path. The current workaround (see `DigiSmart_TrangThai_Roadmap.md`, "Repo & môi
trường chạy code") is to edit code on the Drive path, then robocopy changed files (excluding
`node_modules`/`.next`/`.git`/`.env.local`) to a persistent local clone on `C:\` per machine, run/build/
commit/push from that C: clone. `.claude/launch.json` points at the machine-specific C: path and is
intentionally not meant to be committed when it changes per machine.

## Testing
There is no automated test suite in this repo (no `test`/`jest`/`playwright` script in `package.json`
beyond `lint`). Verification is manual: the roadmap doc records manual end-to-end checks (cart flow,
mobile responsiveness at 375px viewport, Lighthouse/Core Web Vitals scores, cron jobs firing on
production) after each significant change. When changing cart, lead-form, or chatbot behavior, manually
verify against `npm run dev` and note results in `specs/` or the roadmap doc following existing
conventions, since there is no CI to catch regressions automatically. `npm run lint` (ESLint via
`eslint.config.mjs`) is the only automated check available.
