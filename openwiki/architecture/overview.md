# Architecture Overview

## Rendering model
This is a standard Next.js **App Router** project (`app/` directory, no `pages/`). Most pages are
server components (`app/page.tsx`, `app/san-pham/page.tsx`, `app/san-pham/[id]/page.tsx`,
`app/dieu-hoa/page.tsx`, `app/may-loc-nuoc/page.tsx`, `app/kien-thuc/[slug]/page.tsx`, etc.) that
import data directly from `data/*.ts` at build/request time — there is no API layer between pages
and product data. `app/san-pham/[id]/page.tsx` uses `generateStaticParams` to prerender one page per
product id, plus `generateMetadata` for per-product SEO/Open Graph tags.

Interactive pieces (`components/Chatbot.tsx`, `components/ContactWidget.tsx`,
`components/CartContext.tsx`, `components/CartPage.tsx`, `components/Navbar.tsx`,
`components/AddToCartButton.tsx`, `components/LeadForm*.tsx`) are `"use client"` components.

## Route map (`app/`)
| Route | Purpose |
|---|---|
| `/` (`app/page.tsx`) | Homepage: hero, category grid, `SolutionDiagram` ecosystem diagram, featured products |
| `/san-pham` | Full product listing, filterable by `?cat=` and `?brand=` query params |
| `/san-pham/[id]` | Product detail page — gallery, specs, warranty, lead form, add-to-cart |
| `/dieu-hoa` | Air-conditioner category landing page |
| `/may-loc-nuoc` | Water-purifier category landing page |
| `/may-loc-nuoc/cleansui` | Dedicated Cleansui sub-brand landing page with its own font pairing (Noto Serif JP + Noto Sans JP) and design system — see `specs/2026-07-08-design-system-landing-cleansui.md` |
| `/kien-thuc` and `/kien-thuc/[slug]` | SEO content hub: 9 long-form educational articles (`data/kienthuc.ts` `posts`) plus embedded YouTube videos (`articles`) |
| `/gio-hang` | Cart page (`components/CartPage.tsx`) — quantities, totals, booking/lead form |
| `/ve-chung-toi` | About page |
| `/lien-he` | Contact page |
| `/bao-hanh-dieu-khoan` | Warranty & terms page, driven by `data/warranty.ts` |
| `/chinh-sach-bao-mat` | Privacy policy |
| `app/not-found.tsx` | Branded 404 |
| `app/sitemap.ts`, `app/robots.ts` | Generated SEO files |

API routes live under `app/api/` (server-only, see `operations/runbook.md` for what each calls out
to): `app/api/chat/route.ts` (AI chatbot), `app/api/lead/route.ts` (lead/booking form submission),
`app/api/cron/check-videos/route.ts` and `app/api/cron/weekly-leads/route.ts` (scheduled Vercel Cron
jobs, see `vercel.json`).

## Source layout
- `app/` — routes as above.
- `components/` — shared UI. Notable ones: `Navbar.tsx` (sticky header, cart badge, "Dịch vụ" dropdown), `Footer.tsx`, `Chatbot.tsx` (floating AI widget), `ContactWidget.tsx` (floating Zalo/Messenger/phone/email quick-contact widget, both auto-open a few seconds after page load), `SolutionDiagram.tsx` (animated SVG hub-and-spoke diagram on the homepage linking DigiSmart → category hubs → brand logos), `CartContext.tsx` / `CartPage.tsx` / `AddToCartButton.tsx`, `LeadForm.tsx` / `LeadFormButton.tsx`, `ProductGallery.tsx`.
- `data/` — the site's "database": `products.ts` (catalog + `Product` type + `categories`/`brands`), `warranty.ts` (per-brand warranty policy, single source of truth), `kienthuc.ts` (knowledge-hub articles/posts). See `domain/catalog-and-brands.md`.
- `lib/kv.ts` — thin wrapper around the Vercel KV (Upstash Redis) REST API for storing submitted leads.
- `types/` — ambient type declarations (`global.d.ts`, `speech.d.ts` for the Web Speech API used by the chatbot's voice input/output).
- `specs/` — dated design/feature specs kept as historical record (per `AGENTS.md`/`CLAUDE.md` project rules, specs are never deleted after implementation).
- `public/images/` — product photos (`products/`), brand logos (`brands/`), technology illustration images (`tech/`).

## Styling
No CSS-in-JS library and minimal Tailwind usage — nearly all styling is inline `style={{...}}` objects
using CSS custom properties defined in `app/globals.css` (`--brand`, `--brand2`, `--accent`, `--bg`,
`--font-sans`, etc.). `app/globals.css` also defines the small set of responsive rules for the navbar
(`.nav-links`, `.nav-hamburger`, media query at 768px). When adding new UI, follow the existing
inline-style + CSS-variable convention rather than introducing a new styling system, unless the page
is a distinct sub-brand landing page (like `/may-loc-nuoc/cleansui`) that intentionally uses its own
font/design system.

## Client-side cart state
`components/CartContext.tsx` provides a React context (`CartProvider`, wrapped around the whole app in
`app/layout.tsx`) backed by `localStorage` (`digismart_cart` key) — there is no server-side cart or
session. `add`/`remove`/`setQty`/`clear` mutate an array of `{id, name, price, imageUrl, icon, qty}`.
`CartPage.tsx` renders this state plus a booking form that posts to `/api/lead` with an `items` array;
see `workflows/customer-journey.md` for the full checkout-less flow.

## Homepage ecosystem diagram
`components/SolutionDiagram.tsx` renders an SVG "hub and spoke" diagram (DigiSmart center → Điều hòa/Máy lọc nước category hubs → brand logo leaves for Mitsubishi Electric, Daikin, Cleansui, Kitz), inspired by Mitsubishi Electric's own site style (see roadmap commit history). Brand logos live in `public/images/brands/` and are drawn either as inline SVG (`MitsubishiLogo`, hand-drawn diamond mark + wordmark, exported for reuse on `/` and `SolutionDiagram`) or as `<img>` elements for Daikin/Cleansui/Kitz. Every hub/leaf node is a clickable `<a>` linking to `/dieu-hoa`, `/may-loc-nuoc`, or `/san-pham?brand=<Brand>` — if you add a new brand, add both a `LEAVES` entry here and a `CATEGORY_LOGOS` entry in `app/page.tsx`.
