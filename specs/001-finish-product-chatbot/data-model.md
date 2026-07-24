# Phase 1 Data Model: Hoàn thiện Chatbot tư vấn sản phẩm

No database schema, migration, or new persisted table is introduced by this feature (per
Constitution Principle II and the resolved Assumption that the product catalog stays a static
file). The entities below are either existing, reused as-is, or transient client-side state.

## Sản phẩm (Product) — existing, reused unchanged

Source: `data/products.ts` (`Product` type). Read-only for this feature.

| Field | Type | Notes |
|---|---|---|
| id | string | Used by `{{CARD:id}}` lookup |
| name, brand, category | string | Grounds FR-001/FR-005 answers |
| price, price_install? | number | Never fabricated (FR-001) |
| inStock | boolean | Used for out-of-stock edge case |
| isAccessory? | boolean | Excludes accessories from máy lọc nước/điều hòa suggestions |

No changes.

## Chính sách bảo hành (Warranty Policy) — existing, reused unchanged

Source: `data/warranty.ts`. Read-only for this feature; grounds FR-003.

## Cuộc hội thoại (Conversation) — existing, reused unchanged

Client-side only, `Message[]` in `Chatbot.tsx` (`{ role: "user" | "assistant", content: string }`).
No persistence today (matches current behavior; out of scope to add conversation persistence).

## Yêu cầu liên hệ (Lead) — existing shape, reused unchanged

Source: request body accepted by `app/api/lead/route.ts` and stored via `kvPushLead` in `lib/kv.ts`.

| Field | Type | Required | Notes |
|---|---|---|---|
| name | string | yes | ≤200 chars (existing server check) |
| phone | string | yes | ≤30 chars server-side; VN-format checked client-side in the new chat flow (FR-012) |
| note | string | no | New chat flow sends fixed value `"Yêu cầu tư vấn từ Chatbot"` so CSKH can see the lead's origin in the email/weekly digest |
| productName | string | no | Last product the customer discussed in chat, if known |
| address, items | — | no | Not used by the chat flow (only used by the cart/booking lead form) |
| createdAt | ISO string | server-set | Unchanged |

No schema change. The chat flow is simply a new *caller* of this existing contract.

## ChatLeadCapture UI state — new, transient, client-side only

Lives inside `components/Chatbot.tsx`, not persisted:

| Field | Type | Purpose |
|---|---|---|
| `pendingLeadPrompt` | boolean | Whether the latest assistant message included `{{LEAD_FORM}}` and the form should render |
| `leadSubmitted` | boolean (per conversation) | Once true, `{{LEAD_FORM}}` is no longer rendered even if the model emits it again — avoids re-prompting a customer who already left their info in this session |
| form fields (`name`, `phone`) | string | Controlled inputs inside `ChatLeadCapture`, cleared/unmounted after successful submit |

## `{{LEAD_FORM}}` marker — new, in-band protocol (not a data entity, documented fully in
`contracts/lead-form-marker.md`)
