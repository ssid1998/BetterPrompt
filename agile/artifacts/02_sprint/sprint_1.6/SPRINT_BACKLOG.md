# Sprint Backlog: Sprint 1.6

## 📋 Sprint Information

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.6 |
| **Sprint Name** | Sample Prompt Library & Advanced Controls |
| **Reference** | Phase 3 -> Epic 5 (Stories 5.6, 5.7) |
| **Status** | ✅ Completed |

---

## 🎯 Sprint Goal

### What are we building?
We are making the demo flow more flexible and the main UI simpler for beginners. This sprint introduces a library of multiple sample goal + prompt combinations and moves technical controls like provider/model selection into an Advanced panel.

### Expected Outcome (What you will see)
By the end of this sprint, you will be able to:
1. Load multiple preset prompt scenarios instead of just one vague example.
2. Keep the main screen simpler for non-technical users.
3. Open an Advanced section to choose provider and model only when needed.

### Acceptance Criteria
- [x] Users can choose from multiple preset sample combinations.
- [x] The default screen hides advanced provider/model options.
- [x] An Advanced section exposes provider and model controls when expanded.

---

## 📝 Tasks

### Task 1: Build Sample Prompt Library
**Description:** Replace the single vague example with multiple curated demo scenarios.
**Technical Approach:** Create a shared preset data structure containing goal + prompt combinations and render them in a compact sample loader UI.

**Acceptance Criteria:**
- [x] Users can load several distinct demo scenarios with one click each.

**Status:** [x] Done

---

### Task 2: Add Advanced Options Panel
**Description:** Move provider and future model controls into a dedicated advanced section.
**Technical Approach:** Hide advanced controls by default and expose them through an expandable UI pattern.

**Acceptance Criteria:**
- [x] Provider selection is no longer prominent in the primary beginner workflow.

**Status:** [x] Done

---

### Task 3: Add Specific Model Selector
**Description:** Support choosing a model in addition to the provider.
**Technical Approach:** Introduce a model selector that changes available options based on the selected provider.

**Acceptance Criteria:**
- [x] Users can select both a provider and a specific model in Advanced options.

**Status:** [x] Done

---

## 📓 Notes & Decisions

| Date | Decision |
|------|----------|
| 2026-04-30 | Created as a planned future sprint based on user requests for multiple sample combinations and a simplified default UI with advanced controls. |
| 2026-05-04 | Sprint started. Default workflow should stay minimal: users primarily see Goal + Prompt, while provider/model selection moves into an Advanced options drawer. |
| 2026-05-04 | Sprint completed after implementing a reusable sample prompt library, a hidden-by-default Advanced options drawer, and provider-linked specific model choices. |
