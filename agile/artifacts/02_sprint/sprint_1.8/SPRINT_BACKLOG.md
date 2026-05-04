# Sprint Backlog: Sprint 1.8

## 📋 Sprint Information

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.8 |
| **Sprint Name** | Universal Guidelines Consolidation |
| **Reference** | Learn Hub content enhancement |
| **Status** | ✅ Completed |

---

## 🎯 Sprint Goal

### What are we building?
We are simplifying the Learn Hub by merging overlapping universal prompt-writing advice into one stronger BetterPrompt-branded section. This sprint focuses on making the guidance clearer, less repetitive, and more actionable.

### Expected Outcome (What you will see)
By the end of this sprint, you will be able to:
1. See one clean **Universal Guidelines** section with BetterPrompt branding.
2. Learn fewer but stronger universal prompt-writing principles without repetition.
3. Copy a practical BetterPrompt template for writing stronger prompts.

### Acceptance Criteria
- [x] The Learn Hub has one merged **Universal Guidelines** section.
- [x] Repetitive guidance between PromptingGuide concepts and universal rules is removed.
- [x] The section includes actionable prompt-writing pointers.
- [x] The section includes a small BetterPrompt template.

---

## 📝 Tasks

### Task 1: Merge overlapping universal guidance
**Description:** Combine PromptingGuide and Universal Guidelines into one BetterPrompt-branded section.
**Technical Approach:** Consolidate rules in `results/src/data/rules.json` and remove the separate PromptingGuide section from the Learn page.

**Status:** [x] Done

---

### Task 2: Add actionable pointers and template
**Description:** Add practical prompt-writing formulas and a reusable BetterPrompt template.
**Technical Approach:** Store structured pointers and a sample template in `rules.json`, then render them in the Learn page.

**Status:** [x] Done

---

## 📓 Notes & Decisions

| Date | Decision |
|------|----------|
| 2026-04-30 | Created from user request to merge overlapping universal guidance and add a BetterPrompt-style prompt template. |
| 2026-04-30 | Replaced the separate PromptingGuide.ai card with a single BetterPrompt-branded Universal Guidelines section containing principles, actionable pointers, a reusable template, and prompt safety reminders. |
| 2026-05-04 | Sprint formally closed after review confirmed the merged Universal Guidelines experience, actionable pointers, and BetterPrompt template were all present. |
