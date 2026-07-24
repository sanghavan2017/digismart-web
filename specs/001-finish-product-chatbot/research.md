# Phase 0 Research: Hoàn thiện Chatbot tư vấn sản phẩm

All items in Technical Context are resolved (none marked NEEDS CLARIFICATION); this document
records the design decisions needed to close the one real gap (in-chat CSKH handoff) and confirms
which spec requirements are already satisfied by the existing implementation.

## Decision 1: How much of the spec is already implemented

**Decision**: Treat FR-001 through FR-005, FR-007, FR-008, FR-010, FR-011 as **already
implemented** in `components/Chatbot.tsx` / `app/api/chat/route.ts`; verify them via the
quickstart scenarios rather than write new code for them.

**Rationale**: Reading the current `SYSTEM_PROMPT` in `app/api/chat/route.ts` shows it already:
grounds answers strictly in `buildCatalogText()`/`buildWarrantyText()` (FR-001, FR-003), instructs
inserting `{{CARD:id}}` for any product mentioned (FR-002), caps recommendations to 2 products
with reasons (FR-004), and tells the model to admit when a product/brand isn't in the catalog and
suggest the closest match (FR-005). `checkRateLimit` already enforces 20 req/min/IP (FR-008). The
`try/catch` in both the route and `send()` in `Chatbot.tsx` already return a friendly Vietnamese
fallback with the hotline on any AI-provider failure (FR-007), and the widget is a fixed-position
overlay independent of page content (FR-011). Rebuilding any of this would violate Constitution
Principle II (no speculative rework).

**Alternatives considered**: Rewriting the system prompt from scratch — rejected, unnecessary
churn on a prompt that already encodes hard-won business rules (e.g., the Mitsubishi
Electric/Daikin thân máy vs. block warranty distinction, the "isAccessory" exclusion rule).

## Decision 2: FR-006 (brand-scope refusal) needs only a small reinforcement

**Decision**: Add one explicit line to `SYSTEM_PROMPT` naming Unimax/Kruger/Zimmermann/Living
Sense (and "đồ gia dụng nói chung ngoài điều hòa/máy lọc nước") as out of scope, instead of
relying solely on the existing generic "chỉ kinh doanh 2 ngành hàng này" catch-all.

**Rationale**: The existing prompt already has a correct general catch-all for off-catalog
questions, so the failure mode isn't "the bot will invent an answer" — it's "the model might
mention these brand names as if uncertain rather than confidently declining," since they weren't
in its explicit instructions. A one-line addition removes that ambiguity cheaply; a full new
requirement/data addition is out of scope per the resolved Q1 clarification.

**Alternatives considered**: Leave the prompt untouched and rely on the generic catch-all —
rejected because the spec explicitly calls out these brand names (User Story 1, Scenario 3;
Edge Cases), so the acceptance test should be deterministic, not "probably fine."

## Decision 3: Trigger mechanism for in-chat lead capture (FR-009)

**Decision**: Let the LLM signal the trigger, the same way it already signals product cards.
Add a `{{LEAD_FORM}}` marker instruction to `SYSTEM_PROMPT`: append `{{LEAD_FORM}}` as the last
token of a reply when (a) the customer has shown clear buying intent after 2-3 turns about the
same product, or (b) the question is beyond what the bot can answer confidently / is out of
catalog scope. The frontend detects this marker in the assistant's raw reply text and renders an
inline contact-capture form instead of/alongside the text bubble.

**Rationale**: The codebase already has exactly this pattern for `{{CARD:id}}` — a text-embedded
marker that `renderReplyHtml()` parses and replaces. Reusing the mechanism keeps the "when to ask"
decision where all the other conversational judgment already lives (the system prompt / model),
instead of duplicating heuristics (keyword lists, turn counters) in the client that would drift
out of sync with the prompt's own logic. This is the simplest option under Constitution
Principle II.

**Alternatives considered**:
- *Client-side keyword/turn-count heuristic* — rejected: duplicates judgment the model already
  makes better with full conversation context, and needs separate tuning/maintenance in two
  places (prompt wording AND client regex).
- *A structured JSON response instead of free text* — rejected: would require switching the
  Anthropic call away from plain `messages`-style text completion and touch far more of
  `app/api/chat/route.ts` than this feature needs; out of proportion to the gap being closed.

## Decision 4: Rendering an interactive form from an AI-authored text reply

**Decision**: `{{LEAD_FORM}}` cannot be handled the way `{{CARD:id}}` is (a string substituted
into `dangerouslySetInnerHTML`), because a working `<form>` needs React state and an `onSubmit`
handler. Instead: strip the `{{LEAD_FORM}}` token out of the text before HTML rendering, and have
`Chatbot.tsx` track "does the latest assistant message request a lead form" as component state;
when true, render a separate `<ChatLeadCapture>` React element after that message bubble (not
inside the `dangerouslySetInnerHTML` span).

**Rationale**: Keeps the existing `renderReplyHtml()` pure (text → safe HTML string) and adds the
interactive piece alongside it, rather than fighting `dangerouslySetInnerHTML`'s inability to run
React event handlers.

**Alternatives considered**: Injecting a `<form>` with inline `onsubmit="..."` string handlers
into the HTML string — rejected: fragile, unsafe pattern for handling PII input, inconsistent
with how the rest of the app builds forms (controlled React state, e.g. `app/api/lead/route.ts`'s
caller elsewhere in the site).

## Decision 5: Where the captured lead is submitted

**Decision**: `ChatLeadCapture` POSTs directly to the existing `/api/lead` endpoint with
`{ name, phone, note: "Yêu cầu tư vấn từ Chatbot", productName }` (`productName` taken from the
most recently mentioned `{{CARD:id}}` in the conversation, if any, else omitted).

**Rationale**: `/api/lead` already does everything FR-009/FR-013 need — required-field check,
length limits, HTML-escaping, rate limiting (5/10min/IP), Resend email to
`digismart606@gmail.com`, and `kvPushLead` for the weekly digest cron. No backend change,
no new endpoint, no schema change (`note` and `productName` are already accepted, optional
fields on that route). This is a direct application of Constitution Principle II.

**Alternatives considered**: A new `/api/chat-lead` endpoint — rejected as duplicated logic with
no behavioral difference from `/api/lead`.

## Decision 6: Client-side phone-format validation (FR-012)

**Decision**: Validate Vietnamese mobile numbers client-side in `ChatLeadCapture` before calling
`/api/lead`, using a permissive pattern accepting `0` or `+84` followed by a valid VN mobile
prefix and 8 more digits (e.g. `/^(0|\+84)(3|5|7|8|9)\d{8}$/` after stripping spaces/dashes).
Server-side validation in `/api/lead` (presence + max length) is left as-is — not tightened,
since that route is shared with the existing cart/quote lead form and tightening it there is out
of scope for this feature.

**Rationale**: FR-012 asks for format validation before *this* flow submits; doing it client-side
in the new component satisfies that without touching the shared endpoint's contract or risking a
regression in the existing quote/booking lead form (blast radius stays inside the new code).

**Alternatives considered**: Add server-side VN-phone regex validation to `/api/lead` itself —
rejected for this feature: would change behavior for the existing product-page lead form too,
which is outside this spec's scope and risks an unrelated regression.
