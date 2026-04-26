# Sprint Backlog: Sprint 1.2

## 📋 Sprint Information

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.2 |
| **Sprint Name** | Knowledge Base & Assessment Engine |
| **Reference** | Phase 1 Core MVP -> Epic 2 & Epic 3 |
| **Status** | Completed |

---

## 🎯 Sprint Goal

### What are we building?
We are building the core "brain" of the application. First, we will establish the "ground truth" grading rubric by converting official prompting guidelines into a static JSON matrix. Then, we will create the secure backend API route (`/api/assess`) that uses the OpenAI SDK to act as an "LLM-as-a-Judge", grading the user's prompt against these rules.

### Expected Outcome (What you will see)
By the end of this sprint, you will be able to:
1. View a structured `rules.json` file in the codebase containing Universal, OpenAI, Anthropic, and Gemini guidelines.
2. Submit a prompt via the UI we built in Sprint 1.1 and see it trigger the Next.js backend.
3. Have the backend securely call the OpenAI API using a System Prompt that injects our Rules Matrix.
4. Receive a structured JSON response back from the API containing an overall score, sub-scores, and rule violations.

### Acceptance Criteria
- [x] `rules.json` matrix is created and populated with base guidelines.
- [x] `/api/assess` route is established in Next.js.
- [x] OpenAI SDK is installed and configured to use an environment variable (`OPENAI_API_KEY`).
- [x] The API successfully returns a mock or live assessment payload (Score, Sub-scores, Violations).

---

## 📝 Tasks

### Task 1: Create Rules JSON Matrix
**Description:** Format official guidelines into a structured JSON object.
**Technical Approach:** Create `src/data/rules.json` with categories for Universal, OpenAI, Anthropic, and Gemini rules.
**Acceptance Criteria:**
- [x] JSON file exists with valid structure and distinct rule categories.
**Status:** [x] Done

---

### Task 2: OpenAI API Integration Setup
**Description:** Install OpenAI SDK and set up the secure backend route.
**Technical Approach:** Run `npm install openai`. Create `src/app/api/assess/route.ts`. Configure it to read `process.env.OPENAI_API_KEY`.
**Acceptance Criteria:**
- [x] OpenAI SDK installed.
- [x] `/api/assess` POST route is reachable.
**Status:** [x] Done

---

### Task 3: Assessment Prompt Engineering
**Description:** Write the System Prompt that turns the LLM into a Judge.
**Technical Approach:** Create the logic in the API route to combine the user's intent, the selected model provider, the user's prompt, and the relevant rules from the JSON matrix into a single, strict System Prompt instructing the LLM to return structured JSON.
**Acceptance Criteria:**
- [x] API sends a well-structured grading prompt to the LLM.
**Status:** [x] Done

---

### Task 4: Connect UI to Backend & Display Raw Score
**Description:** Update the frontend to call the new API and display the result.
**Technical Approach:** Modify `src/app/page.tsx`'s `handleSubmit` to `fetch('/api/assess')`. Temporarily display the returned JSON data to verify it works (UI polishing comes later).
**Acceptance Criteria:**
- [x] Clicking "Assess Prompt" shows a loading state.
- [x] The raw assessment scores/violations are logged or displayed upon completion.
**Status:** [x] Done

---

## 📓 Notes & Decisions

| Date | Decision |
|------|----------|
| 2026-04-26 | Combining Epic 2 and Epic 3 into Sprint 1.2 since the Rules Matrix is a prerequisite for the Assessment Engine. |
| 2026-04-26 | Implemented conditional logic in `/api/assess`: if no `OPENAI_API_KEY` is present, it returns a mock payload. This allows for safe UI testing without requiring an immediate valid API key. |
