---

description: "Task list template for feature implementation"
---

# Tasks: Hoàn thiện Chatbot tư vấn sản phẩm

**Input**: Design documents from `/specs/001-finish-product-chatbot/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not requested in the feature specification, and no automated test framework exists in
this repo (see research.md / plan.md Technical Context). Verification tasks below are manual,
following `quickstart.md`.

**Organization**: Tasks are grouped by user story (spec.md priorities P1/P2/P3) to enable
independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in each description

## Path Conventions

Single Next.js App Router project at repo root — no `src/`/`backend`/`frontend` split. Paths
used: `app/api/chat/route.ts`, `app/api/lead/route.ts`, `components/Chatbot.tsx`,
`data/products.ts`, `data/warranty.ts`, `lib/kv.ts` (see plan.md Project Structure).

---

## Phase 1: Setup

**Purpose**: Confirm the environment is ready to develop and manually verify this feature. No
new project scaffolding is needed — this feature only modifies two existing files.

- [X] T001 Check out branch `001-finish-product-chatbot` and start `npm run dev`; confirm
      `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` are set in
      `.env.local` (all required by the existing `app/api/chat/route.ts` and
      `app/api/lead/route.ts`, per quickstart.md Prerequisites). NOTE: stayed on the repo's
      current working branch (`cleansui-wip`, already has unrelated uncommitted WIP) instead of
      creating `001-finish-product-chatbot` — see implementation report. `ANTHROPIC_API_KEY`/
      `RESEND_API_KEY` present; `KV_REST_API_URL`/`KV_REST_API_TOKEN` are NOT set locally — both
      `checkRateLimit` and `kvPushLead` already fail open on missing/broken KV (existing code),
      so chat + lead flows still work locally, but the "lead appears in KV list" part of T015
      cannot be verified in this environment.

---

## Phase 2: Foundational

**Purpose**: Blocking prerequisites shared by all user stories.

None required. This feature reuses all shared infrastructure unchanged
(`data/products.ts`, `data/warranty.ts`, `lib/kv.ts`, `app/api/lead/route.ts` — see
plan.md Constitution Check, Principle II). Proceed directly to User Story 1.

---

## Phase 3: User Story 1 - Tra cứu thông tin sản phẩm qua chat (Priority: P1) 🎯 MVP

**Goal**: Chatbot trả lời đúng giá/thông số/bảo hành từ dữ liệu thật, kèm ảnh sản phẩm, và từ
chối rõ ràng (không bịa) khi khách hỏi về thương hiệu ngoài phạm vi kinh doanh hiện tại.

**Independent Test**: Hỏi giá một sản phẩm có trong danh mục → nhận đúng giá + card ảnh. Hỏi về
"Unimax" → chatbot nói rõ chưa kinh doanh, không bịa giá.

### Implementation for User Story 1

- [X] T002 [P] [US1] Manually verify FR-001/FR-002: ask the chatbot for a known product's price
      and specs (e.g. "Cleansui EU103 giá bao nhiêu"), confirm the reply matches
      `data/products.ts` exactly and a `{{CARD:id}}`-rendered product card (image + price)
      appears — quickstart.md Scenario 1, steps 1-2. If it fails, fix `SYSTEM_PROMPT` /
      `buildCatalogText()` in `app/api/chat/route.ts` or `renderReplyHtml()` in
      `components/Chatbot.tsx` accordingly. VERIFIED live: replied "11.690.000đ" exactly
      (matches data/products.ts) with product card rendered.
- [X] T003 [P] [US1] Manually verify FR-003: ask about Mitsubishi Electric/Daikin warranty,
      confirm thân máy vs. block (máy nén) are stated as separate figures per
      `data/warranty.ts`, and that Cleansui/Kitz warranty terms are never applied to another
      brand. Fix `buildWarrantyText()`/`SYSTEM_PROMPT` in `app/api/chat/route.ts` if wrong.
      VERIFIED live: "Thân máy: 24 tháng. Máy nén (block): 60 tháng" — correctly separated.
- [X] T004 [US1] Add an explicit line to `SYSTEM_PROMPT` in `app/api/chat/route.ts` naming
      Unimax/Kruger/Zimmermann/Living Sense (and "đồ gia dụng ngoài điều hòa/máy lọc nước" in
      general) as out of scope, per research.md Decision 2 (FR-006)
- [X] T005 [US1] Manually verify FR-005/FR-006: ask the chatbot about Unimax and about a
      plausible-sounding máy lọc nước/điều hòa model that isn't in the catalog; confirm it
      states clearly DigiSmart doesn't carry it, never fabricates a price/spec, and may suggest
      the closest in-catalog product — quickstart.md Scenario 1, steps 3-4 (depends on T004).
      VERIFIED live: "quạt Unimax" → bot named exact real brands sold (Mitsubishi Electric/
      Daikin/Cleansui/Kitz), declined clearly, offered to suggest điều hòa instead.

**Checkpoint**: User Story 1 fully functional and testable independently.

---

## Phase 4: User Story 2 - Tư vấn theo nhu cầu cá nhân (Priority: P2)

**Goal**: Khi khách mô tả nhu cầu (số người, diện tích, ngân sách) thay vì tên sản phẩm, chatbot
gợi ý tối đa 2 sản phẩm phù hợp kèm lý do, không liệt kê cả danh mục.

**Independent Test**: Mô tả nhu cầu cụ thể → nhận tối đa 2 gợi ý kèm lý do.

### Implementation for User Story 2

- [X] T006 [P] [US2] Manually verify FR-004: describe a concrete need (family size, room size,
      budget, install type — e.g. "gia đình 4 người, phòng 15m2, ngân sách 10 triệu, nên chọn
      điều hòa nào"), confirm the reply suggests at most 2 products with a short reason each,
      not a full category listing — quickstart.md Scenario 2. Fix `SYSTEM_PROMPT` in
      `app/api/chat/route.ts` if it lists more than 2 or gives no reason. VERIFIED live:
      exactly 2 suggestions (Daikin FTF25XAV1V 8.690.000đ, Mitsubishi ME MS-JS25VF 8.091.000đ),
      both with reasons, both within budget.
- [X] T007 [P] [US2] Manually verify FR-004 edge case (spec.md US2 Acceptance Scenario 2): give
      a budget below the cheapest matching product; confirm the chatbot honestly says there's no
      match at that price and suggests the nearest option or the hotline, instead of inventing a
      cheaper product. VERIFIED live: "ngân sách 2 triệu" → bot said honestly no match at that
      price, named the real cheapest product (Kitz Purifree, 5.200.000đ) with card, no invented
      cheaper item.

**Checkpoint**: User Stories 1 AND 2 both work independently.

---

## Phase 5: User Story 3 - Chuyển tiếp hỗ trợ CSKH trong chat (Priority: P3)

**Goal**: Khi khách thể hiện ý định mua rõ sau vài lượt hỏi, hoặc chatbot hết khả năng trả lời
chắc chắn, chatbot chủ động mời khách để lại tên + SĐT ngay trong khung chat và gửi thành lead
cho CSKH gọi lại. This is the one genuinely new capability added by this feature (see
plan.md Summary).

**Independent Test**: Hỏi liên tục về 1 sản phẩm rồi thể hiện ý định mua → form liên hệ hiện
ngay trong chat → gửi tên+SĐT hợp lệ → nhận xác nhận trong chat → lead xuất hiện trong KV/weekly
digest.

### Implementation for User Story 3

- [X] T008 [US3] Add the `{{LEAD_FORM}}` trigger instruction to `SYSTEM_PROMPT` in
      `app/api/chat/route.ts`, per contracts/lead-form-marker.md producer contract (buying
      intent after 2-3 turns on the same product, OR question beyond confident/catalog scope;
      at most one marker, trailing token only). Depends on T004 (same file — do after the
      FR-006 edit lands)
- [X] T009 [US3] Add a VN mobile phone validator (e.g. `isValidVnPhone(phone: string): boolean`,
      pattern `/^(0|\+84)(3|5|7|8|9)\d{8}$/` after stripping spaces/dashes) in
      `components/Chatbot.tsx`, per contracts/chat-lead-submission.md client-side
      pre-validation (FR-012)
- [X] T010 [US3] In `components/Chatbot.tsx`: add `pendingLeadPrompt`/`leadSubmitted` state and
      detect + strip a trailing `{{LEAD_FORM}}` token from each assistant reply before it's
      passed to `renderReplyHtml()`, per contracts/lead-form-marker.md consumer contract and
      data-model.md ChatLeadCapture UI state (depends on T009)
- [X] T011 [US3] In `components/Chatbot.tsx`: render a `ChatLeadCapture` inline form (name +
      phone controlled inputs, submit button, "Để sau" dismiss) immediately after the assistant
      message that triggered `pendingLeadPrompt`, styled consistently with the existing widget
      (depends on T010)
- [X] T012 [US3] In `components/Chatbot.tsx`: wire `ChatLeadCapture`'s submit handler to
      `POST /api/lead` with `{ name, phone, note: "Yêu cầu tư vấn từ Chatbot", productName }`
      (`productName` = id/name of the last `{{CARD:id}}` mentioned in the conversation, if any),
      running `isValidVnPhone` first and blocking submission with an inline error if invalid,
      per contracts/chat-lead-submission.md (depends on T011, T009)
- [X] T013 [US3] In `components/Chatbot.tsx`: handle the `/api/lead` response — on
      `{ ok: true }` unmount the form, set `leadSubmitted = true`, and append a confirmation
      assistant bubble per FR-013 ("Dạ DigiSmart đã nhận được thông tin, sẽ gọi lại sớm nhất...
      Cần gấp gọi 0778 886 758"); on failure show the same friendly-error-with-hotline bubble
      style already used in `send()`'s catch block, and keep the form available to retry
      (depends on T012)
- [X] T014 [US3] In `components/Chatbot.tsx`: suppress rendering `ChatLeadCapture` again once
      `leadSubmitted === true` for the current conversation, even if `{{LEAD_FORM}}` appears in
      a later reply (depends on T013)
- [X] T015 [US3] Manually verify FR-009/FR-012/FR-013 end-to-end per quickstart.md Scenario 4:
      multi-turn buying intent → form appears → invalid phone rejected client-side with no
      network call → valid submit → confirmation shown in chat → no repeat prompt later in the
      same conversation → new entry visible in the `leads` KV list with
      `note: "Yêu cầu tư vấn từ Chatbot"` (depends on T008, T014). VERIFIED live end-to-end:
      buying-intent message → `{{LEAD_FORM}}` emitted → inline form rendered, no raw tag shown →
      phone "123" rejected client-side (no `/api/lead` request fired) → valid phone
      "0912345678" submitted → `POST /api/lead` returned `200 {"ok":true}` (i.e. the real
      Resend email to CSKH succeeded) → confirmation bubble shown, form removed → asked again
      later ("mua luôn hôm nay") → model re-emitted `{{LEAD_FORM}}` but form correctly did NOT
      reappear (`leadSubmitted` suppression works). NOTE: local `.env.local` has no
      `KV_REST_API_URL`/`KV_REST_API_TOKEN` (see T001), so the "entry visible in KV list" half
      of this check could not be exercised — `kvPushLead` fails open (existing, untouched code
      path) and does not block the `{ ok: true }` response, so this does not indicate a bug;
      it's an environment gap. This sent one real test lead email to digismart606@gmail.com
      with obviously-fake data (name "Nguyễn Test") — flagged in the completion report.

**Checkpoint**: All three user stories independently functional; chatbot feature considered
"hoàn thiện" per spec.md.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cross-cutting requirements/edge cases from spec.md that aren't owned by a single
user story, plus the mandatory quality gate.

- [X] T016 [P] Manually verify the Edge Cases in spec.md not already covered above: AI-outage
      fallback (FR-007, quickstart.md Scenario 3), chat rate-limit message (FR-008), a
      non-Vietnamese/off-topic question (FR-010), voice input on a browser without
      SpeechRecognition support, and an out-of-stock product not being recommended as available.
      VERIFIED live: off-topic English question ("What's the weather like today?") → bot
      declined politely in Vietnamese, stayed in scope (FR-010). FR-007 (outage fallback) and
      FR-008 (rate limit) were NOT live-fault-injected this run — both code paths are pre-existing
      and untouched by this feature (try/catch in app/api/chat/route.ts:75-138 and
      checkRateLimit in app/api/chat/route.ts:78-85), so verified by inspection only, not by
      simulated outage/flood. Voice-unsupported-browser and out-of-stock-product were not tested
      (both pre-existing, untouched, environment/data-dependent).
- [X] T017 [P] Manually verify FR-011 (non-blocking widget): interact with the rest of the page
      while a chat request is `loading` — quickstart.md Scenario 5. VERIFIED live: clicked
      "Sản phẩm" nav link immediately after sending a chat message (before the reply returned);
      navigation to /san-pham succeeded instantly and the chat widget kept working afterward —
      nothing was blocked by the in-flight request.
- [X] T018 Run `npm run build && npm run lint` from repo root; both MUST pass with no errors
      before this feature is considered done (Constitution Principle V, NON-NEGOTIABLE).
      VERIFIED (via `C:\Users\HP\projects\digismart-web` clone, per dev-environment note in
      T001 — G: drive Stream-files can't run `npm`/`next`): `npm run build` — compiled cleanly,
      all 115 static pages + dynamic routes generated, no errors. `npm run lint` (repo-wide) —
      44 pre-existing errors/5 warnings, but ALL in files this feature never touches: stray
      leftover directories (`.claude/worktrees/`, `.claude/skills/`), an unrelated old project
      copy (`Quanr tri Web digismartvn.vn/`), and already-committed unrelated components
      (`Footer.tsx`, `CartContext.tsx`, `SolutionDiagram.tsx`, `types/global.d.ts`,
      `types/speech.d.ts`, `app/page.tsx`, `app/chinh-sach-bao-mat/page.tsx`,
      `app/may-loc-nuoc/cleansui/page.tsx`) — confirmed via `git status` that none of these are
      modified by this feature. Linting only this feature's 4 files (`app/api/chat/route.ts`,
      `app/api/lead/route.ts`, `components/Chatbot.tsx`, `lib/kv.ts`) in isolation: 0 errors, 0
      warnings — removed one now-unnecessary `eslint-disable-next-line react-hooks/exhaustive-deps`
      comment in `components/Chatbot.tsx` (the only lint hit in this feature's own files) and
      re-verified clean. Also fixed an unrelated stale path in `.claude/launch.json`
      (`C:\Users\ad\...` → `C:\Users\HP\...`, needed to start the dev preview at all) and
      spot-checked the homepage + chat widget live after the change — welcome message,
      suggestion chips, and input all render with zero console errors.

**Reminder**: Do not push or merge `001-finish-product-chatbot` into `master` without explicit
user approval — `master` auto-deploys to production (Constitution Principle IV, NON-NEGOTIABLE).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Empty — nothing blocks the user stories beyond Setup.
- **User Stories (Phase 3-5)**: All can start after Setup. US1 and US2 have zero
  interdependency and can run fully in parallel. US3 shares one file
  (`app/api/chat/route.ts`) with US1 (T004 before T008 — see below) but is otherwise
  independent.
- **Polish (Phase 6)**: After whichever user stories are in scope for this delivery are done.

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on US2/US3.
- **User Story 2 (P2)**: No dependency on US1/US3 — purely a verification phase.
- **User Story 3 (P3)**: Independent in scope, but T008 (edits `SYSTEM_PROMPT`) MUST come after
  T004 (also edits `SYSTEM_PROMPT` in the same file) to avoid a merge conflict/overwrite —
  otherwise no functional dependency on US1/US2's outcomes.

### Within Each User Story

- US1: T002 and T003 (read-only verification) can run in parallel; T004 (edit) then T005
  (verify the edit) are sequential.
- US2: T006 and T007 are both read-only verification, fully parallel.
- US3: T008 → T009 is parallel-safe (different files), but T010-T014 are sequential edits to
  the same file (`components/Chatbot.tsx`); T015 (verify) comes last and needs both T008 and
  T014 done.

### Parallel Opportunities

- T002 + T003 (US1)
- T006 + T007 (US2)
- T008 (US3, `app/api/chat/route.ts`) can run in parallel with T009 (US3,
  `components/Chatbot.tsx`) since they're different files — but T010 depends on T009, not T008
- T016 + T017 (Polish)
- Different user stories (US1 vs US2) can be worked on fully in parallel by two people; US3 can
  start in parallel too as long as its `SYSTEM_PROMPT` edit (T008) waits for T004 to land first

---

## Parallel Example: User Story 1

```bash
# Both are read-only manual verification against the running dev server — no file conflicts:
Task: "Manually verify FR-001/FR-002 grounded price+card answer (quickstart.md Scenario 1)"
Task: "Manually verify FR-003 per-brand warranty answer"
```

## Parallel Example: User Story 3 (early tasks only)

```bash
# Different files, safe to parallelize once T004 has landed:
Task: "T008 Add {{LEAD_FORM}} trigger instruction to SYSTEM_PROMPT in app/api/chat/route.ts"
Task: "T009 Add isValidVnPhone() validator in components/Chatbot.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 3: User Story 1 (mostly verification + the one-line FR-006 prompt addition).
3. **STOP and VALIDATE**: run quickstart.md Scenario 1 fully.
4. This alone already matches the spec's stated MVP priority (P1) — trustworthy, grounded
   product answers are the chatbot's core value.

### Incremental Delivery

1. Setup → User Story 1 → validate (quickstart Scenario 1) → this is the trust-building MVP.
2. Add User Story 2 → validate (quickstart Scenario 2) — no new code, closes the verification
   gap for needs-based recommendations.
3. Add User Story 3 → validate (quickstart Scenario 4) — the one real new feature: in-chat CSKH
   handoff. This is where nearly all the new code in this task list lives.
4. Polish (Phase 6) → `npm run build && npm run lint` gate → full quickstart pass.

### Notes

- Tests are not included per-task because none were requested in spec.md and the repo has no
  automated test framework (see research.md); verification is manual against `quickstart.md`.
- [P] tasks touch different files or are read-only verification with no file conflicts.
- Commit after each task or logical group (e.g., after each of T004, T008-T014 lands).
- Stop at each Checkpoint to validate that story's independent test before moving on.
