# Quickstart: Validate the finished chatbot

No automated test suite exists in this repo (see `research.md` Decision on Testing). Validate by
running the dev server and exercising these scenarios directly, mapped to the spec's acceptance
scenarios and success criteria.

## Prerequisites

- `npm run dev` running locally with `ANTHROPIC_API_KEY`, `RESEND_API_KEY`,
  `KV_REST_API_URL`/`KV_REST_API_TOKEN` set (same env vars the existing `/api/chat` and
  `/api/lead` routes already require).
- Open the site, wait for the chatbot to auto-open (or click the chat bubble).

## Scenario 1 — Grounded product answers (US1, FR-001/002, SC-001)

1. Ask: "Cleansui EU103 giá bao nhiêu".
2. **Expect**: reply states the real price from `data/products.ts`, with a product card
   (image + price) rendered inline — not plain text only.
3. Ask about a brand not sold here: "Bên mình có bán quạt Unimax không".
4. **Expect**: reply clearly states DigiSmart doesn't sell that, does not invent a price, and
   optionally suggests a catalog product if relevant (FR-006).

## Scenario 2 — Needs-based recommendation (US2, FR-004)

1. Ask: "Gia đình 4 người, phòng 15m2, ngân sách 10 triệu, nên chọn điều hòa nào".
2. **Expect**: at most 2 product suggestions with a short reason each — not a full category
   listing.

## Scenario 3 — AI outage fallback (Edge case, FR-007, SC-002)

1. Temporarily unset/break `ANTHROPIC_API_KEY` (or block the Anthropic domain).
2. Ask any product question.
3. **Expect**: chat still responds within a few seconds with a friendly Vietnamese error message
   and the hotline number — never hangs with no reply.
4. Restore the key before continuing.

## Scenario 4 — In-chat CSKH handoff (US3, FR-009/012/013, SC-004/005) — new behavior

1. Ask about the same product across 2-3 turns, ending with clear intent: "cho anh đặt lắp cái
   Cleansui EU103 này".
2. **Expect**: the assistant's reply is followed by an inline contact form (name + phone) — no
   raw `{{LEAD_FORM}}` text visible anywhere.
3. Try submitting with an invalid phone (e.g. `123`).
   **Expect**: inline validation error, no network call made.
4. Submit with a valid name + VN phone (e.g. `0912345678`).
   **Expect**: a confirmation message appears in the chat ("đã nhận được thông tin..."), the form
   disappears, and no second lead-capture form appears later in the same conversation even if the
   model emits `{{LEAD_FORM}}` again.
5. Verify server-side: check that a new entry lands in the `leads` KV list (e.g. via the existing
   weekly-leads cron/report or KV inspection) with `note: "Yêu cầu tư vấn từ Chatbot"`.

## Scenario 5 — Non-blocking widget (FR-011)

1. While the chatbot is open and mid-request (`loading` state), interact with the rest of the
   page (scroll, click a product card, open the cart).
2. **Expect**: the rest of the site remains fully usable; nothing is blocked by the chat request.

## Before marking the feature done

Run, per Constitution Principle V (NON-NEGOTIABLE):

```bash
npm run build && npm run lint
```

Both MUST pass with no errors.
