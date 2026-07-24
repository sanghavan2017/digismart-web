# Contract: Chat lead submission (consumes existing `POST /api/lead`)

**Between**: `ChatLeadCapture` (new, inside `components/Chatbot.tsx`) → `app/api/lead/route.ts`
(existing, **unmodified**)

This documents how the new in-chat lead-capture form uses the *existing* `/api/lead` contract.
It is a consumer note, not a change to that endpoint.

## Request (unchanged endpoint, new caller)

`POST /api/lead`

```json
{
  "name": "string, required, ≤200 chars",
  "phone": "string, required, ≤30 chars — VN mobile format enforced client-side before this call",
  "note": "\"Yêu cầu tư vấn từ Chatbot\" — fixed string, lets CSKH see the lead's origin",
  "productName": "string, optional — id/name of the last product mentioned via {{CARD:id}} in this conversation, if any"
}
```

`address` and `items` are intentionally omitted (not used by the chat flow).

## Client-side pre-validation (new, per FR-012)

Before calling the endpoint, `ChatLeadCapture` MUST reject submission and show an inline error if:
- `name` is empty/whitespace-only, or
- `phone` does not match a VN mobile pattern (e.g. `/^(0|\+84)(3|5|7|8|9)\d{8}$/` after
  stripping spaces/dashes).

## Response handling (existing behavior, reused)

- `200 { ok: true }` → `ChatLeadCapture` unmounts the form, sets `leadSubmitted = true`, and the
  chat shows a confirmation assistant bubble per FR-013 ("Dạ DigiSmart đã nhận được thông tin,
  sẽ gọi lại sớm nhất. Cần gấp thì gọi ngay 0778 886 758.").
- Non-200 / network error → chat shows the same style of friendly error bubble already used
  elsewhere in `Chatbot.tsx` (e.g. `send()`'s catch block), including the hotline fallback. The
  form stays available so the customer can retry (per Constitution I — failure must not dead-end
  the customer).

## Rate limiting (existing, unchanged)

`/api/lead` already rate-limits to 5 requests / 10 minutes / IP via `checkRateLimit`. The chat
flow shares this limit with the existing product-page lead form — no separate limit is
introduced.
