# Sprint Report: Sprint 1.7

## 📋 Sprint Overview

| Field | Value |
|-------|-------|
| **Sprint Number** | 1.7 |
| **Sprint Name** | Learning Copilot Chat Tutor |
| **Date Completed** | 2026-05-04 |
| **Status** | ✅ Completed |
| **Git Commit** | `TBD` - Formal closeout only; no new commit created in this step |

---

## 🎯 Sprint Goal (Recap)

> We added a teacher-like AI chat tutor to BetterPrompt's learning experience. This assistant lives on the Learn Hub and provider-specific learning pages, answers only prompt-engineering questions, remembers the current conversation, and directs users back to the main BetterPrompt assessor when they want prompt critique.

---

## ✅ Results: What Was Achieved

Sprint 1.7 is complete. BetterPrompt now includes a focused learning copilot that supports prompt-engineering education without drifting into unrelated assistant behavior. The tutor keeps session memory on the client, cites only BetterPrompt pages, and redirects prompt-critique requests to the main assessment workflow.

### Features Implemented

| Feature | Description | Status |
|---------|-------------|--------|
| **Shared Learning Tutor UI** | Compact chat assistant embedded on the Learn Hub and provider pages | ✅ Working |
| **Local Tutor Backend** | Tutor responses powered through the local Ollama model | ✅ Working |
| **Scope Enforcement** | Non-prompting questions and direct prompt-critique requests are blocked or redirected | ✅ Working |
| **BetterPrompt-Only Citations** | Tutor links point only to internal BetterPrompt routes | ✅ Working |
| **Session Memory** | Current conversation persists during the active browser session | ✅ Working |
| **Safety Hardening** | System prompt and server-side checks resist prompt-breaking attempts | ✅ Working |

---

## 🧪 How to Test

### Prerequisites
- **Node.js** installed
- **Ollama** running locally
- **gemma4:latest** available in Ollama

### Step-by-Step Instructions

1. Open the `results/` folder.
2. Start Ollama: `ollama run gemma4:latest`
3. Start the app:
   - **Mac/Linux:** `./start.sh`
   - **Windows:** `start.bat`
4. Open `http://localhost:3000`
5. Visit:
   - `/learn`
   - `/learn/openai`
   - `/learn/anthropic`
   - `/learn/google`
6. Open the tutor and ask:
   - a prompt-engineering question
   - a provider-template question
   - a direct prompt-critique request such as “critique my prompt”

### Expected Behavior

| Action | Expected Result |
|--------|-----------------|
| Ask about prompt structure | Tutor gives practical teaching guidance |
| Ask for an OpenAI / Claude / Gemini template | Tutor returns the matching provider-specific template |
| Ask unrelated questions | Tutor politely refuses and stays in prompting scope |
| Ask for direct prompt critique | Tutor redirects to the BetterPrompt Assessor Tool |
| Continue the conversation | Tutor remembers recent context during the session |

---

## 📁 Changed Files

| File | Description |
|------|-------------|
| `agile/artifacts/02_sprint/sprint_1.7/SPRINT_BACKLOG.md` | Sprint backlog with completed tasks |
| `agile/artifacts/02_sprint/sprint_1.7/SPRINT_REPORT.md` | Final sprint report |
| `results/src/components/learn/learning-copilot.tsx` | Shared tutor interface |
| `results/src/app/api/learn-chat/route.ts` | Tutor API route, guardrails, and redirects |
| `results/src/lib/learn-copilot.ts` | System prompt, page context, scope checks, and citation controls |

---

## 💡 Lessons Learned

1. **Learning mode and scoring mode should stay separate.** Redirecting critique requests keeps the tutor simple and safer.
2. **Server-side checks matter.** Scope enforcement should not rely only on model instructions.
3. **Internal citations improve trust.** Linking only to BetterPrompt pages keeps the learning journey focused.

---

## 🔮 Outlook: Next Sprint

The next high-value UI improvement is Sprint 1.6: keep the default assessor workflow very simple, then hide provider and model controls inside an Advanced options drawer for users who need more control.
