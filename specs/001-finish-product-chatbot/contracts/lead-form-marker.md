# Contract: `{{LEAD_FORM}}` in-band marker

**Between**: `app/api/chat/route.ts` (SYSTEM_PROMPT / Anthropic reply) → `components/Chatbot.tsx`
(reply renderer)

**Pattern**: Extends the existing `{{CARD:id}}` in-band marker convention already used in this
codebase — the model is instructed to embed a literal token in its plain-text reply, and the
frontend parses it out before display.

## Producer contract (system prompt)

The system prompt in `app/api/chat/route.ts` MUST instruct the model to append the exact literal
token `{{LEAD_FORM}}` as the final token of a reply, with no arguments, when either condition
holds:

1. The customer has asked about the same product across 2-3+ turns and has expressed clear
   buying/scheduling intent ("đặt lắp", "mua cái này", "chốt", etc.), OR
2. The question is beyond what the bot can answer confidently from the catalog/warranty data
   (including the FR-006 case: a brand/category DigiSmart doesn't sell).

Constraints (mirroring the existing `{{CARD:id}}` rules for consistency):
- At most one `{{LEAD_FORM}}` per reply.
- The marker MUST NOT appear inside the customer-visible sentence — it's a trailing signal only.
- The model MUST still write a normal, complete Vietnamese reply before the marker; the marker
  is additive, not a replacement for answering.

## Consumer contract (frontend)

`components/Chatbot.tsx` MUST, for each assistant message:

1. Detect a trailing `{{LEAD_FORM}}` token in the raw reply text (before HTML-escaping/markdown
   sanitization, same pass where `{{CARD:id}}` is currently detected).
2. Strip the token from the text used for display (customer never sees the literal marker).
3. If detected AND the customer has not already submitted a lead in this conversation
   (`leadSubmitted === false`), render a `ChatLeadCapture` form immediately after that message
   bubble.
4. If detected but `leadSubmitted === true`, do nothing extra (no repeat prompt).

## Failure mode

If the model emits `{{LEAD_FORM}}` malformed (e.g., mid-sentence, multiple times) — the frontend
only ever acts on a trailing occurrence and strips all occurrences from displayed text; extra
occurrences are simply ignored, never shown to the customer, and never crash the render (matches
Constitution I: chat failures degrade gracefully).
