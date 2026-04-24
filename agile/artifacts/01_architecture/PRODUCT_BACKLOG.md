# Product Backlog: BetterPrompt (v2 - Architecture Refined)

Status: **Architecture Approved**

## 🏷️ Legend
*   `[FEAT]` **Feature:** Value for the user.
*   `[ARCH]` **Architecture:** Technical foundation.
*   `[TECH-ENABLER]` **Technical Enabler:** Hidden work required to make a feature function.
*   `[DEBT]` **Technical Debt:** Cleanup work.

---

## 🚀 Phase 1: Core MVP (High Priority)
*Objective: Get the fundamental application running, connecting the front-end text box to the back-end AI Judge.*

### Epic 1: Prompt Input & Context Gathering
**Goal:** To capture all necessary context (the prompt, the intent, the target model) so the tool can provide highly relevant and accurate feedback.
*   `[ARCH-ADD]` **Story 1.0: Initialize Next.js & Tailwind Repository**
    *   *Rationale: We need a Greenfield environment that supports both front-end UI and secure backend API routes for the LLM.*
*   `[FEAT]` **Story 1.1: Text Input Field** (Demo: User pastes 500 words without truncation).
*   `[FEAT]` **Story 1.2: User Intent Capture** (Demo: User fills in a "Goal" text field before submitting).
*   `[FEAT]` **Story 1.3: Target Model Selection** (Demo: User selects "Anthropic Claude" from a list).
*   `[FEAT]` **Story 1.5: Input Validation & Error Handling** (Demo: Tool shows a "Please enter at least 10 words" warning).

### Epic 2: Prompting Knowledge Base & Rule Engine
**Goal:** To establish the "ground truth" grading rubric based on industry standards.
*   `[TECH-ENABLER]` **Story 2.0: Create Rules JSON Matrix**
    *   *Rationale: The LLM needs structured data. We must format the official guidelines (Universal, OpenAI, Anthropic, Gemini) into a static JSON or Markdown object in our codebase for Context Injection.*
*   `[FEAT]` **Story 2.1: Universal Guidelines Set**
*   `[FEAT]` **Story 2.2: OpenAI Formatting Rules**
*   `[FEAT]` **Story 2.3: Anthropic Formatting Rules**
*   `[FEAT]` **Story 2.4: Google Gemini Formatting Rules**
*   `[FEAT]` **Story 2.5: Dynamic Rule Selection** (Demo: System generates combined checklist based on user dropdown).

### Epic 3: Assessment & Scoring System
**Goal:** To objectively measure the quality of a prompt using an LLM-as-a-Judge.
*   `[TECH-ENABLER]` **Story 3.0: OpenAI API Integration & System Prompt Setup**
    *   *Rationale: We must write the backend API route (`/api/assess`) that securely combines the user's prompt with our Rules JSON and asks GPT-4o to grade it and return structured JSON.*
*   `[FEAT]` **Story 3.1: Overall Prompt Score Generation**
*   `[FEAT]` **Story 3.2: Category Sub-scoring (Clarity & Context)**
*   `[FEAT]` **Story 3.3: Intent Alignment Check**
*   `[FEAT]` **Story 3.4: Rule Violation Detection**
*   `[FEAT]` **Story 3.5: Positive Reinforcement Detection**

---

## 📅 Phase 2: Feedback Loop & PDF Support (Medium Priority)
*Objective: Display the AI's feedback beautifully and add support for document ingestion.*

### Epic 4: Feedback & Improvement Recommendations
**Goal:** To provide actionable learning moments and a ready-to-use perfect prompt.
*   `[FEAT]` **Story 4.1: Pros and Cons List**
*   `[FEAT]` **Story 4.2: Actionable Improvement Tips**
*   `[FEAT]` **Story 4.3: Model-Specific Tips Display**
*   `[FEAT]` **Story 4.4: The "Perfect" Rewritten Prompt**
*   `[FEAT]` **Story 4.5: Copy to Clipboard Button**

### Epic 1 (Continued): Document Parsing
*   `[TECH-ENABLER]` **Story 1.4a: Implement `pdf-parse` Backend Logic**
    *   *Rationale: Browsers cannot read PDFs easily. We must send the file to our Next.js backend and use a Node library to extract raw text.*
*   `[FEAT]` **Story 1.4b: PDF Upload & Extraction UI** (Demo: User uploads a PDF; the text is populated into the input field).

---

## 🎓 Phase 3: Education & Presentation (Medium-High Priority)
*Objective: Ensure the application acts as a teacher, not just a calculator, and is ready for the professor's demonstration.*

### Epic 6: Educational Learning Hub
**Goal:** Provide foundational knowledge on prompt engineering so users understand the feedback they receive. *Rationale: Prevents user frustration when told they broke a rule they don't understand.*
*   `[FEAT]` **Story 6.1: Global Navigation Bar** (Demo: User can toggle between "Assess" and "Learn").
*   `[FEAT]` **Story 6.2: Prompting 101 Page** (Demo: A static page explaining Clarity, Context, and Role).
*   `[FEAT]` **Story 6.3: Model-Specific Cheat Sheets** (Demo: Dedicated sections explaining Claude XML and OpenAI Markdown).
*   `[ARCH-ADD]` **Story 6.4: DRY Rule Rendering**
    *   *Rationale: Ensure the Learn page reads directly from the `Rules JSON Matrix` (Story 2.0) so we only update rules in one place.*

### Epic 5: Educational Demo Showcase
**Goal:** Guarantee a smooth, impressive presentation for the university professor.
*   `[FEAT]` **Story 5.1: "Load Sample" Button**
*   `[FEAT]` **Story 5.2: Pre-loaded Vague Prompt Example**
*   `[FEAT]` **Story 5.3: Pre-loaded Wrong Model Example**
*   `[FEAT]` **Story 5.4: Guided Tour/Tooltips**
*   `[FEAT]` **Story 5.5: Presentation Reset Feature**

---

## 🧊 Icebox (Low Priority)
*   User accounts and login to save past prompts.
*   Integration directly into Jupyter Notebooks.
*   Live API connection to automatically execute the rewritten prompt and show the AI's response.