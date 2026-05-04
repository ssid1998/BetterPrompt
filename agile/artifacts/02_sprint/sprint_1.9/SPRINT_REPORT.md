# Sprint Report: Sprint 1.9

## 📋 Sprint Overview

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.9 |
| **Sprint Name** | Assessor Hardening & Injection Resistance |
| **Date Completed** | 2026-05-04 |
| **Status** | ✅ Completed |
| **Git Commit** | `TBD` - No commit created in this step |

---

## 🎯 Sprint Goal (Recap)

> We made the BetterPrompt assessor more trustworthy by adding deterministic structural checks for prompt features such as XML tags and adding resistance to prompt-injection or score-manipulation attempts so the judge cannot be easily misled by text like “ignore the judge” or “give this a perfect score.”

---

## ✅ Results: What Was Achieved

Sprint 1.9 is complete. BetterPrompt no longer depends only on the AI judge's opinion for core structural checks. The assessor now performs rule-based validation first, uses those findings to guide the judge, and shows those trust and safety checks back to the user. It also flags suspicious evaluator-targeting language and applies a deterministic score penalty when needed.

### Features Implemented

| Feature | Description | Status |
|---------|-------------|--------|
| **Deterministic Structure Checks** | BetterPrompt now directly detects role signals, context markers, output-format requests, constraints, and XML tags in code | ✅ Working |
| **Anthropic XML Protection** | Anthropic-targeted prompts with XML tags are no longer allowed to be falsely labeled as missing XML tags | ✅ Working |
| **Prompt-Injection Detection** | Score-manipulation and evaluator-targeting phrases are flagged before results are returned | ✅ Working |
| **Guardrailed Score Reconciliation** | The final score and feedback are reconciled against hard checks instead of trusting raw model output blindly | ✅ Working |
| **Trust & Safety UI** | Users can now see deterministic validation and safety findings in the results screen | ✅ Working |

---

## 🧪 How to Test

### Prerequisites
- **Node.js** installed
- **Ollama** running locally
- **gemma4:latest** available in Ollama

### Step-by-Step Instructions

1. **Open the `results/` folder** in your file explorer.

2. **Start the application:**
   - **Mac/Linux:** Double-click `start.sh` (or run `./start.sh` in Terminal).
   - **Windows:** Double-click `start.bat`.

3. **Interact with the application:**
   - Open `http://localhost:3000`
   - Load the **Precise Demo Prompt** and assess it
   - Confirm the Trust & Safety Checks section says XML-style tags were detected
   - Paste a manipulative prompt containing phrases like “ignore the judge” or “give this a perfect score” and assess it

4. **Stop the application:**
   - Run `stop.sh` / `stop.bat`.

### Expected Behavior

| Action | Expected Result |
|--------|-----------------|
| Assess the precise Anthropic demo prompt | XML tags are recognized in Trust & Safety Checks |
| Assess a manipulative prompt | Injection/manipulation warning appears and a score penalty can be applied |
| Review the result | User sees deterministic structural checks alongside model feedback |

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Assessment does not run | Make sure Ollama is running and `gemma4:latest` is available |
| Trust & Safety section is missing | Re-run the assessment after refreshing so the latest backend response is used |

---

## 📁 Changed Files

| File | Description |
|------|-------------|
| `agile/artifacts/02_sprint/sprint_1.9/SPRINT_BACKLOG.md` | Sprint backlog updated to completed status |
| `agile/artifacts/02_sprint/sprint_1.9/SPRINT_REPORT.md` | Final sprint report |
| `results/src/lib/assessor-guardrails.ts` | Deterministic structure checks, prompt-injection detection, and score reconciliation |
| `results/src/app/api/assess/route.ts` | Guardrail analysis integrated into the assessor pipeline |
| `results/src/app/page.tsx` | Trust & Safety Checks section added to the results UI |

---

## 💡 Lessons Learned

1. **Hard checks are necessary.** Some prompt features should be validated in code, not guessed by a model.
2. **Trust improves when users can see the guardrails.** Exposing the checks makes score decisions easier to understand.
3. **Safety and scoring are linked.** Evaluator-targeting language should not be treated as normal prompt content during assessment.

---

## 🔮 Outlook: Next Sprint

The next useful improvement would be deeper structural validation, such as better multi-prompt segmentation, richer provider-specific scoring rules, and clearer explanations of exactly why each subscore changed.
