# Sprint Backlog: Sprint 1.5

## 📋 Sprint Information

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.5 |
| **Sprint Name** | Knowledge Base Expansion & Learn Content Refresh |
| **Reference** | Phase 3 -> Epic 6 (Stories 6.5, 6.6) |
| **Status** | Planned |

---

## 🎯 Sprint Goal

### What are we building?
We are strengthening BetterPrompt's teaching and scoring foundation by expanding the centralized rules matrix with fresher guidance from official model-provider documentation and curated external learning sources. This sprint focuses on making the knowledge base more complete, more current, and easier to maintain.

### Expected Outcome (What you will see)
By the end of this sprint, you will be able to:
1. See a richer `rules.json` knowledge base covering more prompting best practices.
2. Learn additional prompt engineering concepts on the BetterPrompt website.
3. Trust that BetterPrompt's educational content stays closer to official provider guidance.

### Acceptance Criteria
- [ ] `rules.json` is expanded with validated guidance from official OpenAI, Anthropic, and Google sources.
- [ ] Curated concepts from PromptingGuide.ai are incorporated into the Learn experience.
- [ ] Learn pages and scoring logic stay synchronized with the updated rules matrix.

---

## 📝 Tasks

### Task 1: Expand Provider Rules Matrix
**Description:** Add more official prompting guidance for OpenAI, Anthropic, and Google Gemini into the centralized rules data.
**Technical Approach:** Review the current provider documentation, normalize the guidance into consistent rule statements, and update `results/src/data/rules.json`.

**Acceptance Criteria:**
- [ ] Each provider section in `rules.json` includes additional validated best practices.

**Status:** [ ] Pending

---

### Task 2: Integrate PromptingGuide Concepts
**Description:** Add selected prompt engineering concepts from PromptingGuide.ai into BetterPrompt's educational experience.
**Technical Approach:** Curate high-value concepts, map them into BetterPrompt-friendly sections, and render them in the Learn hub without duplicating provider rules.

**Acceptance Criteria:**
- [ ] BetterPrompt includes clearly labeled third-party learning concepts.

**Status:** [ ] Pending

---

### Task 3: Keep Learn Pages DRY
**Description:** Ensure the expanded knowledge base flows cleanly into the site without new hardcoded duplication.
**Technical Approach:** Reuse shared rendering patterns and data-driven sections so updates happen in one place.

**Acceptance Criteria:**
- [ ] Learn content remains data-driven after the expansion.

**Status:** [ ] Pending

---

## 📓 Notes & Decisions

| Date | Decision |
|------|----------|
| 2026-04-30 | Created as a planned future sprint based on user request to expand BetterPrompt's rules and educational content from official docs and PromptingGuide.ai. |
