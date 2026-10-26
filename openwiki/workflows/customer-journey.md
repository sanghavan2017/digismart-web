# Customer & Content Workflows

## Browse → cart → booking (no online payment)
The site deliberately has **no checkout/payment gateway**. The real-world flow is: customer browses
`/san-pham`, `/dieu-hoa`, or `/may-loc-nuoc` (optionally filtered via `?cat=`/`?brand=` query params),
views a product detail page (`/san-pham/[id]`), and either:
1. Clicks **"Thêm vào giỏ"** (`components/AddToCartButton.tsx`) to add the item to the client-side cart
   (`components/CartContext.tsx`, persisted to `localStorage` under `digismart_cart`), then goes to
   `/gio-hang` (`components/CartPage.tsx`) to adjust quantities, review the total, and submit a
   booking form (name/phone/address/note); or
2. Clicks a "Nhận báo giá"/lead button (`components/LeadFormButton.tsx` → `LeadForm.tsx`) directly from
   a product page for a single-item quote request without going through the cart.

Both paths **POST to `/api/lead`** (`app/api/lead/route.ts`). The route distinguishes the two cases by
whether `items[]` is present: if so, it renders an HTML table of products/quantities/totals and sends
a "Đặt lịch lắp đặt" (booking) email via Resend; otherwise it sends a simpler "Yêu cầu báo giá" (quote
request) email. Every lead is also pushed to Vercel KV (`lib/kv.ts` → `kvPushLead`, capped at the 500
most recent) regardless of email success, so a submission is never fully lost even if Resend fails.
The customer is expected to actually **pay at installation time** ("thu tiền lúc lắp đặt") — this is
an explicit product decision (see `DigiSmart_TrangThai_Roadmap.md`, "Quyết định: brand/content site,
không cần Medusa.js") and should not be treated as a missing feature.

## AI chatbot conversation flow
`components/Chatbot.tsx` renders a floating widget that **auto-opens ~2.5s after page load** (once per
session, unless the user has already toggled it manually) with a canned welcome message and quick-reply
suggestions. User messages are sent to `/api/chat` (`app/api/chat/route.ts`), which forwards the full
message history plus a system prompt built from `data/products.ts`/`data/warranty.ts` to the Anthropic
Claude API (model `claude-sonnet-4-6`) and returns the reply as plain text. The client renders the
reply through `renderReplyHtml()`, which strips any markdown the model might have added and expands
`{{CARD:<productId>}}` tags into real product cards. Optional voice input/output uses the Web Speech
API (`recognitionRef`, `window.speechSynthesis`, Vietnamese voice preferred) — see `types/speech.d.ts`
for the ambient typing. If the Anthropic call fails, the route returns a friendly Vietnamese apology
message pointing to the hotline rather than surfacing an error (see `domain/catalog-and-brands.md`).

`components/ContactWidget.tsx` is a separate floating quick-contact cluster (Zalo/Messenger/phone/email)
that also **auto-opens ~1.5s after page load**; it does not talk to any API — the links are static
`tel:`/`mailto:`/external URLs. Some of these links are known placeholders pending correction (see
`operations/runbook.md`).

## Content/SEO hub (`/kien-thuc`)
`/kien-thuc` lists both legacy embedded YouTube videos (`articles` in `data/kienthuc.ts`) and 9
long-form articles (`posts`) rendered individually at `/kien-thuc/[slug]` with Article JSON-LD,
canonical URLs, and sitemap inclusion. This exists purely for organic search acquisition (no BTU/TDS
calculators or interactivity) — adding a new article is a pure data change (append to `posts`), no
routing/component work needed. See `domain/catalog-and-brands.md` for the data shape and content rules
(real images only, cited sources).

## Scheduled/background workflows
Two Vercel Cron jobs run independently of any user action — see `operations/runbook.md` for schedules,
required env vars, and what each does (`check-videos` scans two YouTube channels for new uploads;
`weekly-leads` emails a digest of the past week's leads pulled from Vercel KV).
