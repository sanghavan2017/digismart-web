# Catalog, Brands & Domain Concepts

## The `Product` type (`data/products.ts`)
`data/products.ts` defines the `Product` type and is the single source of truth for the entire
catalog (currently ~86 SKUs: 18 water purifiers + 68 air conditioners). Key fields and rules:

- `price` / `originalPrice` — `originalPrice` is only shown struck-through with a discount badge
  when it is actually greater than `price` (see `discountPct()` helpers repeated in each page). A
  past bug showed fake "-0%" badges on same-priced items; this was fixed across all 5 pages that
  render products (`/san-pham`, `/`, `/dieu-hoa`, `/may-loc-nuoc`, `/san-pham/[id]`) — **do not**
  reintroduce a badge that renders when discount is 0.
- `brand` — one of `brands` (`Cleansui`, `Kitz`, `Mitsubishi Electric`, `Daikin`). Pricing policy per
  brand (documented in `DigiSmart_TrangThai_Roadmap.md`): Mitsubishi Electric retail price = manufacturer
  list price − 10% (rounded down); Daikin retail price = Daikin E-Shop price, `originalPrice` = list
  price (yields a genuine 12–17% badge). Changing the discount strategy means editing `price`/`originalPrice`
  per SKU in this file, not a global multiplier.
- `isAccessory` — marks non-core items (e.g. a smart water meter) so the chatbot and category pages
  never recommend them when a customer asks about purifiers/AC units. Always set this on any add-on SKU.
- `images` (carousel) vs `imageUrl` (single image) — product detail page shows a carousel when `images`
  is present, otherwise falls back to `imageUrl` (see `components/ProductGallery.tsx`).
- `highlights` — short bullet list shown directly on listing-page cards (added so cards match the
  brand sites' style). `features` — image + caption blocks shown on the product detail page ("Điểm nổi
  bật"/highlights section); as of the last major catalog pass, all 68 Mitsubishi Electric + Daikin SKUs
  and the Cleansui/Kitz lines have this filled in.
- `price_install`, `warranty_years`, `btu`/`power_kw`/`inverter` (AC-specific), `capacity_lph`/`stages`/`has_hot`/`has_cold` (purifier-specific) are optional spec fields used across listing/detail pages and the chatbot catalog summary.

`categories` (Máy lọc nước, Điều hòa) and `brands` are also exported from this file and drive the
homepage category grid, navbar "Dịch vụ" dropdown, and `/san-pham` filter query params (`?cat=`, `?brand=`).

## Warranty policy (`data/warranty.ts`)
`warrantyPolicies: WarrantyPolicy[]` is the **single canonical source** for warranty terms, each entry
scoped to one brand with a `chatbotSummary` (exact wording injected verbatim into the AI chatbot's
system prompt), a `details[]` list (used on `/bao-hanh-dieu-khoan`), and a `sourceUrl` for
verification. This file exists because warranty terms differ meaningfully per brand (e.g. Mitsubishi
Electric: 24 months body / 60 months compressor; Daikin: 12 months body / 60 months compressor, plus
a conditional 3-year extended program for specific wall-mounted models requiring the customer to
self-register via the Daikin app) and a past bug caused the chatbot to answer generically ("bảo hành
5 năm") regardless of brand. **When updating warranty terms, edit only this file** — both the legal
page and the chatbot system prompt (`app/api/chat/route.ts` → `buildWarrantyText()`) read from it, so
edits here propagate everywhere automatically. Never let brand-specific warranty terms bleed into
each other in chatbot answers.

## Knowledge hub (`data/kienthuc.ts`)
Two pieces of content live here:
- `articles: Article[]` — 3 embedded YouTube videos (legacy content).
- `posts` (typed via `Post`/`PostSection`) — 9 long-form SEO articles split between "Điều hòa" (BTU
  sizing, inverter tech, CSPF, 1-chiều vs 2-chiều, cleaning) and "Máy lọc nước" (TDS, Cleansui hollow-fiber
  membrane tech, filter replacement, point-of-use vs whole-house filtration) categories, rendered at
  `/kien-thuc/[slug]`. Each post carries a `sources[]` list (official brand sites, WHO, QCVN standards)
  and each `PostSection` can include an `image` (illustration must be a real existing image under
  `public/images/`, never a placeholder/fabricated graphic — this was an explicit correction after an
  earlier pass had no illustrations). To add a new article, add an object to `posts`; no other code
  changes are required (routing/JSON-LD/sitemap all derive from the array).

## AI chatbot's use of domain data (`app/api/chat/route.ts`)
The chatbot's `SYSTEM_PROMPT` is built dynamically at request time from `data/products.ts` (via
`buildCatalogText()`) and `data/warranty.ts` (via `buildWarrantyText()`) — there is no separately
maintained chatbot knowledge base. Notable content rules baked into the prompt (do not weaken these
without checking with product owner):
- Never fabricate prices/specs not present in the catalog; if a customer asks about something out of
  scope, suggest the closest 1–2 real products and point to the hotline.
- Never blend AC brand warranty terms; always separate "thân máy" (body) vs "máy nén" (compressor).
- Every product mention must include a `{{CARD:<id>}}` tag which `components/Chatbot.tsx`'s
  `renderReplyHtml()` expands into a real product card (image + price) pulled live from
  `data/products.ts` — if you rename or remove a product `id`, the corresponding chatbot card lookup
  (`productIndex`) will silently render nothing, so keep IDs stable or update both together.
- No markdown formatting is expected in replies (chat UI shows raw text); `sanitizeMarkdown()` in
  `Chatbot.tsx` strips headings/bold/tables defensively in case the model doesn't comply.
- If the Anthropic API errors, the route returns a friendly Vietnamese fallback message pointing to
  the hotline instead of a raw error (added so the chatbot never looks "broken" to a customer).
