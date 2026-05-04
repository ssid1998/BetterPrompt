# Sprint Backlog: Sprint 1.9

## 📋 Sprint Information

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.9 |
| **Sprint Name** | Assessor Hardening & Injection Resistance |
| **Reference** | Phase 1 / Phase 2 quality hardening based on assessor reliability gap |
| **Status** | ✅ Completed |

---

## 🎯 Sprint Goal

### What are we building?
We are making the BetterPrompt assessor more trustworthy. This sprint adds deterministic structural checks for prompt features such as XML tags and adds resistance to prompt-injection or score-manipulation attempts so the judge cannot be easily misled by text like “ignore the judge” or “give this a perfect score.”

### Expected Outcome (What you will see)
By the end of this sprint, you will be able to:
1. See more reliable feedback when a prompt clearly contains structural elements like XML tags.
2. Have the assessor flag suspicious score-manipulation or prompt-injection language.
3. Trust that the judge output is checked against rule-based validation before it is shown.

### Acceptance Criteria
- [x] Anthropic-style prompts with valid XML tags are not incorrectly flagged as missing XML tags.
- [x] Suspicious prompt-injection or score-manipulation language is detected and surfaced in the assessment.
- [x] The final response combines deterministic checks with the AI judge output in a user-visible way.

---

## 📝 Tasks

### Task 1: Add Deterministic Structure Checks
**Description:** Detect structural prompt features in code before trusting the AI judge.
**Technical Approach:** Build server-side checks for XML tags, role statements, context markers, format requests, and constraints, then feed those findings into the assessment pipeline.

**Acceptance Criteria:**
- [x] XML-tag presence is detected directly in code and available to the assessor pipeline.

**Status:** [x] Done

---

### Task 2: Add Prompt-Injection & Score-Manipulation Detection
**Description:** Identify prompts that try to manipulate the evaluator or override the judging task.
**Technical Approach:** Add pattern-based detection for suspicious phrases and apply deterministic violations and scoring guardrails when those patterns are found.

**Acceptance Criteria:**
- [x] Suspicious evaluator-targeting language is flagged before results are returned.

**Status:** [x] Done

---

### Task 3: Reconcile Judge Output with Hard Checks
**Description:** Prevent clearly false judge feedback from reaching the UI unchanged.
**Technical Approach:** Post-process the model output, remove contradictions against hard checks, add trustworthy validation notes, and surface them in the frontend.

**Acceptance Criteria:**
- [x] User-visible results include deterministic trust/safety validation details.

**Status:** [x] Done

---

## 📓 Notes & Decisions

| Date | Decision |
|------|----------|
| 2026-05-04 | Sprint created after the assessor falsely reported missing XML tags in a demo prompt that visibly contained them. |
| 2026-05-04 | This sprint will combine deterministic rule checks with LLM judging rather than relying on model judgment alone. |
| 2026-05-04 | Added deterministic structure checks, prompt-injection detection, score penalties for evaluator-targeting language, and UI trust/safety visibility. |
