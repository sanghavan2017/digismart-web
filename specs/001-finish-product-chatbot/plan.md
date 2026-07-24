# Implementation Plan: Hoàn thiện Chatbot tư vấn sản phẩm

**Branch**: `001-finish-product-chatbot` | **Date**: 2026-07-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-finish-product-chatbot/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

The existing `components/Chatbot.tsx` + `app/api/chat/route.ts` already implement most of the
spec: AI-dynamic answers (Anthropic Claude) grounded in the static catalog (`data/products.ts`,
`data/warranty.ts`), product cards via `{{CARD:id}}`, per-brand warranty rules, needs-based
recommendations (max 2), out-of-scope handling, abuse rate-limiting, and graceful fallback on AI
failure. The one functional gap against the spec is **User Story 3 / FR-009, FR-012, FR-013**:
there is no in-chat mechanism to capture a customer's name + phone and hand them to CSKH — today
the bot only tells the customer to call the hotline. This plan adds a proactive in-chat
lead-capture flow, reusing the existing `/api/lead` endpoint and `lib/kv.ts` infrastructure
(no new backend, no new dependency, no schema change), plus a small system-prompt reinforcement
for FR-006 (explicitly declining brands like Unimax/Kruger/Zimmermann/Living Sense that are
outside today's catalog). The remaining functional requirements are verified against the running
app rather than rebuilt.

## Technical Context

**Language/Version**: TypeScript 5, React 19, Next.js 16 (App Router)

**Primary Dependencies**: None new. Reuses existing: Next.js API routes, `fetch` (Anthropic
Messages API, Resend REST API), `lib/kv.ts` (Upstash Redis REST client). No npm package added —
per Constitution Principle II.

**Storage**: Vercel KV (Upstash Redis REST, via `lib/kv.ts`) for the `leads` list (unchanged
shape: `{ name, phone, productName?, address?, note?, items?, createdAt }`). Product/warranty
data stays in static TypeScript files (`data/products.ts`, `data/warranty.ts`) — no
API/DB is introduced, per the resolved Assumption in spec.md.

**Testing**: No automated test framework exists in this repo (no Jest/Playwright config).
Verification is manual: `npm run build && npm run lint` (Constitution Principle V,
NON-NEGOTIABLE) plus exercising the acceptance scenarios in a running dev-server preview.

**Target Platform**: Web browser (desktop + mobile), Vercel serverless functions for the two
API routes involved (`app/api/chat/route.ts`, `app/api/lead/route.ts`).

**Project Type**: Web application — single Next.js project (no separate frontend/backend repos).

**Performance Goals**: No new SLA introduced. Preserve existing rate limits: chat 20 req/min/IP,
lead submission 5 req/10min/IP (both already enforced via `checkRateLimit` in `lib/kv.ts`).

**Constraints**: No new runtime dependency (Constitution II). Chatbot replies MUST stay grounded
in `data/products.ts`/`data/warranty.ts` only (FR-001). No push/merge to `master` without
explicit approval (Constitution IV — this is production, auto-deploys via Vercel).

**Scale/Scope**: One UI component (`components/Chatbot.tsx`) + one system prompt
(`app/api/chat/route.ts`) touched for the new lead-capture trigger; `app/api/lead/route.ts` and
`lib/kv.ts` reused unchanged. No new routes, tables, or data files.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|---|---|---|
| I. Customer-Facing Reliability First | Lead-capture submit reuses `/api/lead`, which already fails open on non-critical KV logging and returns a clear Vietnamese error + hotline fallback on hard failure. Chat itself is unaffected if lead submit fails. | PASS |
| II. Simplicity & Minimal Dependencies | No new npm package, no new API route, no new storage. Reuses `/api/lead`, `lib/kv.ts`, and the existing `{{TAG}}`-in-reply parsing pattern (`{{CARD:id}}`) extended with one more tag. | PASS |
| III. Customer Data Handling | Name/phone are user-supplied PII; `/api/lead` already escapes values before embedding in the email HTML and is rate-limited per IP. New client-side VN phone-format validation (FR-012) is additive, not a relaxation. | PASS |
| IV. Production Deploy Gate | Work stays on branch `001-finish-product-chatbot`; no merge to `master` without explicit approval. | PASS (procedural — honored during implementation) |
| V. Verify-Before-Merge | `npm run build && npm run lint` required before the task is considered done; UI change verified in a running preview per the quickstart scenarios below. | PASS (procedural — honored during implementation) |

No violations. Complexity Tracking table is not needed.

*Re-checked after Phase 1 design (data-model.md, contracts/, quickstart.md): the design adds no
new dependency, no new endpoint, no schema change, and reuses `/api/lead` + `lib/kv.ts` as-is —
all five principles still PASS with no new risk introduced.*

## Project Structure

### Documentation (this feature)

```text
specs/001-finish-product-chatbot/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
components/
└── Chatbot.tsx           # MODIFY: add {{LEAD_FORM}} tag parsing + inline contact-capture UI

app/api/
├── chat/route.ts         # MODIFY: system prompt — add {{LEAD_FORM}} trigger instruction,
│                          #   reinforce FR-006 (decline Unimax/Kruger/Zimmermann/Living Sense)
└── lead/route.ts         # REUSE unchanged — chat lead-capture POSTs here directly

data/
├── products.ts           # REUSE unchanged (read-only source of truth for FR-001..FR-005)
└── warranty.ts           # REUSE unchanged (read-only source of truth for FR-003)

lib/
└── kv.ts                 # REUSE unchanged (kvPushLead, checkRateLimit)
```

**Structure Decision**: Single Next.js App Router project (no frontend/backend split, no new
top-level directory). This feature only modifies `components/Chatbot.tsx` and
`app/api/chat/route.ts`; everything else it depends on already exists and is reused as-is.

## Complexity Tracking

> Not applicable — no Constitution Check violations to justify.
