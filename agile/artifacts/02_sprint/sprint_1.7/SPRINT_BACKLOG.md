# Sprint Backlog: Sprint 1.7

## 📋 Sprint Information

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.7 |
| **Sprint Name** | Learning Copilot Chat Tutor |
| **Reference** | Phase 3 -> Epic 6 (Stories 6.7, 6.8, 6.9) |
| **Status** | ✅ Completed |

---

## 🎯 Sprint Goal

### What are we building?
We are adding a teacher-like AI chat tutor to BetterPrompt's learning experience. This assistant will live on the main Learn page and the provider-specific learning pages, answer only prompt-engineering questions, remember the current conversation, and direct users back to the main BetterPrompt assessor when they want prompt critique.

### Expected Outcome (What you will see)
By the end of this sprint, you will be able to:
1. Chat with a built-in prompt-engineering tutor from the Learn Hub and provider pages.
2. Ask questions about how to write better prompts and receive teacher-style guidance.
3. See links to relevant BetterPrompt pages inside tutor replies.
4. Be redirected to the main Assessor Tool when asking for direct prompt critique.

### Acceptance Criteria
- [x] A small chat tutor appears on `/learn` and the provider-specific learning pages.
- [x] The tutor answers only prompting and prompt-engineering questions.
- [x] The tutor remembers the conversation during the current session.
- [x] The tutor links only to BetterPrompt pages and not to external documentation.
- [x] If a user asks for prompt critique, the tutor tells them to use the main BetterPrompt Assessor Tool.
- [x] The system prompt is hard-coded and designed to resist prompt-breaking attempts as much as practical.

---

## 📝 Tasks

### Task 1: Build Learn Page Chat UI
**Description:** Add a compact chat assistant panel to the Learn Hub and provider pages.
**Technical Approach:** Create a shared chat component that can be embedded across `/learn`, `/learn/openai`, `/learn/anthropic`, and `/learn/google`.

**Acceptance Criteria:**
- [x] Users can open and use the tutor from all learning pages.

**Status:** [x] Done

---

### Task 2: Add Local Tutor Backend
**Description:** Power the tutor with the local Ollama model (`gemma4:latest`).
**Technical Approach:** Create a dedicated API route for the tutor and send it a locked teaching system prompt plus selected BetterPrompt learning context.

**Acceptance Criteria:**
- [x] The tutor responds using the local model and BetterPrompt learning context.

**Status:** [x] Done

---

### Task 3: Enforce Tutor Scope and Redirects
**Description:** Restrict the tutor to teaching prompt engineering only.
**Technical Approach:** Add hard-coded rules in the system prompt and response logic so critique requests are redirected to the main Assessor Tool.

**Acceptance Criteria:**
- [x] Prompt-critique requests are redirected to BetterPrompt's main assessment workflow.

**Status:** [x] Done

---

### Task 4: Add BetterPrompt-Only Citations
**Description:** Let the tutor cite relevant BetterPrompt learning pages in its answers.
**Technical Approach:** Provide the tutor with an internal page map and require replies to link only to BetterPrompt routes.

**Acceptance Criteria:**
- [x] Tutor replies can link to BetterPrompt Learn pages and the Assessor Tool.

**Status:** [x] Done

---

### Task 5: Session Memory and Safety Hardening
**Description:** Preserve the current conversation while protecting the tutor from being easily redirected off-task.
**Technical Approach:** Store chat history for the active session and design the system prompt plus server-side checks to keep the assistant in teacher mode.

**Acceptance Criteria:**
- [x] The tutor remembers the conversation during the session.
- [x] The tutor stays focused on prompting education even when users try to derail it.

**Status:** [x] Done

---

## 📓 Notes & Decisions

| Date | Decision |
|------|----------|
| 2026-04-30 | Created from user-defined requirements for a teacher-style learning copilot on the Learn Hub and provider pages. |
| 2026-04-30 | Tutor scope is intentionally limited to prompting and prompt engineering. Prompt critique should redirect users to the main BetterPrompt Assessor Tool. |
| 2026-04-30 | Citations should point only to BetterPrompt pages, not external documentation. |
| 2026-04-30 | Conversation memory is required for the active session. |
| 2026-04-30 | Implemented client-side session memory using `sessionStorage`, while keeping the tutor model stateless on the server beyond the messages provided by the client. |
| 2026-04-30 | Added server-side scope checks for prompt-critique requests and non-prompting questions before sending requests to the local Ollama tutor model. |
| 2026-05-04 | Sprint formally closed after review confirmed all acceptance criteria were implemented and all backlog tasks were complete. |
