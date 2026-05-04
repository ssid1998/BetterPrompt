# Sprint Backlog: Sprint 1.12

## 📋 Sprint Information

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.12 |
| **Sprint Name** | Assessor Page Tutor Access |
| **Reference** | New backlog item requested by user |
| **Status** | ✅ Completed |

---

## 🎯 Sprint Goal

### What are we building?
We are adding the BetterPrompt Tutor to the main assessor page so users can get prompt-engineering guidance without leaving the assessment workflow.

### Expected Outcome (What you will see)
By the end of this sprint, you will be able to:
1. Open the BetterPrompt Tutor directly from the assessor page.
2. Ask prompt-engineering questions while staying in the main assessment experience.
3. Keep the tutor scoped correctly so direct prompt critique still routes to the assessor workflow.

### Acceptance Criteria
- [x] The BetterPrompt Tutor is available on the assessor page.
- [x] Tutor conversations on the assessor page remain scoped to prompt-engineering help.
- [x] The assessor page tutor does not interrupt the main prompt assessment workflow.

---

## 📝 Tasks

### Task 1: Extend Tutor Page Context to Support the Assessor
**Description:** Add an assessor-aware tutor context so the chat backend can support `/` properly.
**Technical Approach:** Extend the tutor page key map, context generator, and API validation to include the assessor page.

**Acceptance Criteria:**
- [x] The tutor backend accepts the assessor page as a valid context.

**Status:** [x] Done

---

### Task 2: Mount the Tutor on the Assessor Page
**Description:** Make the floating BetterPrompt Tutor available from the main home/assessor route.
**Technical Approach:** Reuse the shared LearningCopilot component on the assessor page and keep its behavior consistent with the rest of the app.

**Acceptance Criteria:**
- [x] Users can open the tutor directly from the assessor page.

**Status:** [x] Done

---

### Task 3: Verify Workflow Compatibility
**Description:** Confirm the tutor remains helpful without replacing the assessor itself.
**Technical Approach:** Verify direct prompt-critique requests still redirect users to use the assessor workflow and run lint/build checks.

**Acceptance Criteria:**
- [x] Assessor-page tutor behavior remains scoped and verified.

**Status:** [x] Done

---

## 📓 Notes & Decisions

| Date | Decision |
|------|----------|
| 2026-05-04 | User requested that the BetterPrompt Tutor also be available on the assessor page and asked to start the sprint immediately. |
| 2026-05-04 | Implemented assessor-specific tutor page context while preserving the rule that direct critique requests should use the assessor workflow itself. |
