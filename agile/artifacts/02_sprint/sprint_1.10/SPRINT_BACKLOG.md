# Sprint Backlog: Sprint 1.10

## 📋 Sprint Information

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.10 |
| **Sprint Name** | Global Design Refresh |
| **Reference** | Post-plan backlog item based on Perplexity type/color reference |
| **Status** | ✅ Completed |

---

## 🎯 Sprint Goal

### What are we building?
We are refreshing the overall BetterPrompt visual system so the product feels cleaner, more editorial, and more consistent with the Perplexity reference for typography and color. The provider-specific OpenAI, Anthropic, and Google sections should keep their own distinctive design language.

### Expected Outcome (What you will see)
By the end of this sprint, you will be able to:
1. See a cleaner overall BetterPrompt shell with softer grayscale surfaces and a stronger accent color.
2. Navigate a more minimal top bar and layout system across the main app pages.
3. Keep provider-specific sections visually distinct while the rest of the product shares one global design scheme.

### Acceptance Criteria
- [x] The global BetterPrompt shell uses a Perplexity-inspired neutral palette and accent styling.
- [x] The home, scoring, and Learn Hub pages reflect the new overall design scheme.
- [x] OpenAI, Anthropic, and Google provider sections keep their own typography/design treatments.

---

## 📝 Tasks

### Task 1: Establish Global Design Tokens
**Description:** Create reusable global color and surface tokens for the refreshed design system.
**Technical Approach:** Add CSS variables and reusable utility classes in `globals.css` for backgrounds, surfaces, strokes, chips, buttons, and inputs.

**Acceptance Criteria:**
- [x] Shared layout surfaces and controls use centralized global tokens.

**Status:** [x] Done

---

### Task 2: Refresh Global Layout and Main Assessor
**Description:** Apply the new global design system to the navigation shell and main BetterPrompt assessor.
**Technical Approach:** Update `layout.tsx` and `page.tsx` to use the new palette, spacing, chip styling, and button/input system.

**Acceptance Criteria:**
- [x] The top navigation and main assessor follow the refreshed visual system.

**Status:** [x] Done

---

### Task 3: Refresh Supporting Pages While Preserving Provider-Specific Sections
**Description:** Apply the new design to shared pages without overwriting provider-specific branding blocks.
**Technical Approach:** Update the Scoring page and Learn Hub wrapper sections while keeping OpenAI, Anthropic, and Google blocks unchanged.

**Acceptance Criteria:**
- [x] Shared pages reflect the new overall design and provider-specific blocks remain distinct.

**Status:** [x] Done

---

## 📓 Notes & Decisions

| Date | Decision |
|------|----------|
| 2026-05-04 | User requested a Perplexity-inspired overall design refresh using the live type/color references. |
| 2026-05-04 | The refresh uses scraped reference cues: grayscale surfaces, restrained borders, strong accent color, minimal chips/buttons, and a tighter editorial layout. |
