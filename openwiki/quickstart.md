# DigiSmart Web — Quickstart

DigiSmart is a Vietnamese-language marketing and lead-generation website for a small retailer that
sells and installs two product lines: **Điều hòa** (air conditioners — Mitsubishi Electric, Daikin)
and **Máy lọc nước** (water purifiers — Cleansui by Mitsubishi Chemical, Kitz Micro Filter). It is a
content/catalog site with a lightweight cart, not a full e-commerce checkout: customers add items to
a cart, submit a "book an installation" form, and pay in person when the technician installs the
unit (COD at install). See `DigiSmart_TrangThai_Roadmap.md` (Vietnamese) for the authoritative,
continuously-updated project status/roadmap log — read it first when picking up work on this repo.

## Stack
- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**, **Tailwind/PostCSS** config present but most UI uses plain inline `style={{}}` objects rather than Tailwind classes.
- Deployed on **Vercel**; production domain `www.digismartvn.com` (non-www redirects to www — see `operations/runbook.md`).
- No traditional database. All catalog/content data is hard-coded TypeScript in `data/*.ts` and edited directly (see `domain/catalog-and-brands.md`).
- Font: **Noto Sans JP** loaded via `next/font/google` in `app/layout.tsx`, exposed as CSS var `--font-sans` (see `app/globals.css`). The `/may-loc-nuoc/cleansui` landing page additionally loads Noto Serif JP for a distinct look (see `architecture/overview.md`).

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```
`.env.local` holds required secrets (not committed) — see `operations/runbook.md` for the list of env var names needed (Anthropic, Resend, Vercel KV, cron secret, etc). Never print or commit real values.

⚠️ Project-specific dev quirk: the canonical working copy lives on a Google Drive-synced path
(`G:\My Drive\Hoc AI\digismart-web`), which breaks `npm install`/`next dev` directly. The documented
workflow is to edit on the Drive path, then robocopy changes to a persistent local clone on `C:\` to
actually run `npm run dev`/commit/push from there. Details and current status are in
`DigiSmart_TrangThai_Roadmap.md` under "Repo & môi trường chạy code" — do not assume `npm run dev`
works directly from the Drive path.

## Where to go next
- **[Architecture Overview](architecture/overview.md)** — App Router route map, rendering model, styling approach, cart state, source layout for `app/`, `components/`, `data/`, `lib/`.
- **[Catalog & Domain Concepts](domain/catalog-and-brands.md)** — the `Product` type, `data/products.ts`/`data/warranty.ts`/`data/kienthuc.ts` as the site's "database", brand/pricing rules, and the AI chatbot's product/warranty rules.
- **[Customer Journeys](workflows/customer-journey.md)** — browse → product detail → cart → booking-lead flow; the AI chatbot conversation flow; content/SEO hub (`/kien-thuc`).
- **[Operations & Integrations](operations/runbook.md)** — env vars, Vercel cron jobs, third-party integrations (Anthropic Claude, Resend email, Vercel KV, YouTube Data API, GA4/GSC), and known operational caveats (Resend test mode, placeholder social links).

## Things to know before changing code
- There is **no backend commerce system** (Medusa.js was explicitly rejected — see roadmap "Quyết định: brand/content site, không cần Medusa.js"). Do not introduce checkout/payment code without confirming this decision still holds.
- `data/products.ts`, `data/warranty.ts`, and `data/kienthuc.ts` are the single sources of truth for product info, warranty copy, and educational articles respectively — the AI chatbot's system prompt (`app/api/chat/route.ts`) is generated dynamically from these files, so editing data automatically updates chatbot knowledge.
- Warranty terms differ per brand and must **never** be blended together (a past bug conflated all brands into "5 years"); `data/warranty.ts` is the one place to fix or extend warranty copy — see `domain/catalog-and-brands.md`.
- Social/marketplace links (Facebook, TikTok, Shopee) in `components/Footer.tsx`, `app/lien-he/page.tsx`, `app/san-pham/[id]/page.tsx`, and `components/ContactWidget.tsx` are known to be placeholders/incorrect per the roadmap doc — check there before treating them as verified.
