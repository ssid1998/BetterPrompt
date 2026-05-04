# Sprint Report: Sprint 1.12

## 📋 Sprint Overview

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.12 |
| **Sprint Name** | Assessor Page Tutor Access |
| **Date Completed** | 2026-05-04 |
| **Status** | ✅ Completed |
| **Git Commit** | `TBD` - No commit created in this step |

---

## 🎯 Sprint Goal (Recap)

> We added the BetterPrompt Tutor to the main assessor page so users can get prompt-engineering guidance without leaving the assessment workflow.

---

## ✅ Results: What Was Achieved

Sprint 1.12 is complete. The BetterPrompt Tutor is now available directly on the assessor page. Users can ask prompt-engineering questions while staying inside the main assessment flow, and the tutor still stays scoped correctly: it teaches prompt-writing, but direct prompt critique still belongs in the assessor workflow.

### Features Implemented

| Feature | Description | Status |
|---------|-------------|--------|
| **Assessor Page Tutor Access** | Floating BetterPrompt Tutor launcher now appears on the main home/assessor page | ✅ Working |
| **Assessor-Specific Tutor Context** | Tutor backend now understands the assessor page as a valid context | ✅ Working |
| **Workflow-Safe Guidance** | Direct critique requests still point users back to the assessor flow instead of bypassing it | ✅ Working |

---

## 🧪 How to Test

### Prerequisites
- **Node.js** installed
- **Ollama** running locally
- **gemma4:latest** available in Ollama

### Step-by-Step Instructions

1. Open the `results/` folder.
2. Start the app:
   - **Mac/Linux:** `./start.sh`
   - **Windows:** `start.bat`
3. Open `http://localhost:3000`
4. Open the **BetterPrompt Tutor** from the assessor page.
5. Ask:
   - a prompt-engineering question
   - a provider/template question
   - a direct prompt-critique request such as “score my prompt”

### Expected Behavior

| Action | Expected Result |
|--------|-----------------|
| Open the home page | BetterPrompt Tutor launcher is visible |
| Ask about prompt structure | Tutor answers with prompt-engineering help |
| Ask for direct prompt critique | Tutor redirects you to use the assessor workflow on the page |
| Continue assessing prompts | Tutor does not block the main form or result flow |

---

## 📁 Changed Files

| File | Description |
|------|-------------|
| `agile/artifacts/02_sprint/sprint_1.12/SPRINT_BACKLOG.md` | Sprint backlog updated to completed status |
| `agile/artifacts/02_sprint/sprint_1.12/SPRINT_REPORT.md` | Final sprint report |
| `results/src/lib/learn-copilot.ts` | Added assessor page support and assessor-specific context |
| `results/src/app/page.tsx` | Mounted the BetterPrompt Tutor on the assessor page |

---

## 💡 Lessons Learned

1. **Access matters.** Tutor availability is most useful when it is present where the user is already working.
2. **Scope still matters.** Even on the assessor page, the tutor should teach rather than replace the scoring workflow.
3. **Shared components pay off.** Reusing the existing tutor component made this sprint small and safe.

---

## 🔮 Outlook: Next Sprint

The next related improvement could be making the assessor-page tutor more context-aware of the user's current goal/provider selection, while still keeping prompt critique inside the assessor workflow.
