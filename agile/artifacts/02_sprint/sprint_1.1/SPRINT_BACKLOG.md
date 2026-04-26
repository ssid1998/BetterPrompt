# Sprint Backlog: Sprint 1.1

## 📋 Sprint Information

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.1 |
| **Sprint Name** | Prompt Input & Context Gathering |
| **Reference** | Phase 1 Core MVP -> Epic 1 |
| **Status** | Completed |

---

## 🎯 Sprint Goal

### What are we building?
We are building the fundamental application structure and the primary user input interface. This involves setting up the Next.js frontend/backend foundation and capturing the necessary context (the prompt, user intent, and target model) before passing it to the AI Judge.

### Expected Outcome (What you will see)
By the end of this sprint, you will be able to:
1. Run a local Next.js server with Tailwind CSS styling.
2. View and interact with a Text Input Field capable of accepting large prompts.
3. Fill in a "Goal" text field to capture user intent.
4. Select a Target Model (e.g., Anthropic Claude) from a dropdown list.
5. See validation warnings (e.g., "Please enter at least 10 words") if the input is invalid.

### Acceptance Criteria
- [x] Next.js repository is initialized with Tailwind CSS.
- [x] User can paste at least 500 words without truncation.
- [x] User can input their goal/intent.
- [x] User can select a target model.
- [x] Input validation correctly restricts submission of short prompts.

---

## 📝 Tasks

### Task 1: Initialize Next.js & Tailwind Repository
**Description:** Set up a Greenfield Next.js project with Tailwind CSS to support both front-end UI and secure backend API routes.
**Technical Approach:** Run `npx create-next-app` in the `results/` directory, configure Tailwind, and ensure the basic app runs.

**Acceptance Criteria:**
- [x] Next.js app starts successfully on localhost.
- [x] Tailwind CSS is active and functional.

**Status:** [x] Done

---

### Task 2: Text Input Field
**Description:** Create a large text area for users to paste their prompts.
**Technical Approach:** Build a React component with a `textarea` that handles large text inputs efficiently.

**Acceptance Criteria:**
- [x] User can paste up to 500 words without UI breaking or text truncation.

**Status:** [x] Done

---

### Task 3: User Intent Capture
**Description:** Add an input field for users to specify what they want their prompt to achieve.
**Technical Approach:** Create a secondary text input field for the "Goal".

**Acceptance Criteria:**
- [x] The "Goal" field is visible and captures text input.

**Status:** [x] Done

---

### Task 4: Target Model Selection
**Description:** Allow users to choose which LLM they are targeting with their prompt.
**Technical Approach:** Implement a dropdown/select component with options like "Anthropic Claude", "OpenAI", etc.

**Acceptance Criteria:**
- [x] Dropdown displays correctly and allows model selection.

**Status:** [x] Done

---

### Task 5: Input Validation & Error Handling
**Description:** Prevent users from submitting empty or overly short prompts.
**Technical Approach:** Add form validation logic (e.g., minimum 10 words) that triggers a warning message in the UI before submission.

**Acceptance Criteria:**
- [x] Shows a warning like "Please enter at least 10 words" if the prompt is too short.

**Status:** [x] Done

---

## 📓 Notes & Decisions

| Date | Decision |
|------|----------|
| 2026-04-26 | Starting with Sprint 1.1 based on Epic 1 of the Core MVP Phase. |
| 2026-04-26 | Implemented a clean, user-friendly React component to capture User Intent, Target Model, and Prompt. Added real-time word counting and validation logic preventing submission of prompts under 10 words. Helper scripts (`start.sh`, `start.bat`) were configured successfully to automatically clear the port and start the dev server. |
