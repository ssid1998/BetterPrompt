# Product Backlog: BetterPrompt

Status: **Initial Draft**

## 🏷️ Legend
*   `[FEAT]` **Feature:** Value for the user.
*   `[ARCH]` **Architecture:** Technical foundation.
*   `[DEBT]` **Technical Debt:** Cleanup work.

---

## 🚀 High Priority (Ready)

### Epic 1: Prompt Input & Context Gathering
**Goal (Business Value):** To capture all necessary context (the prompt, the intent, the target model) so the tool can provide highly relevant and accurate feedback.
**Experience (User Experience):** The user lands on a clean web interface, pastes text or uploads a PDF, types a brief sentence about their goal, selects "Claude" or "ChatGPT" from a dropdown, and clicks "Assess".

*   `[FEAT]` **Story 1.1: Text Input Field**
    *   **As a** user
    *   **I want to** paste my prompt into a large text area
    *   **So that** the tool can analyze my exact wording.
    *   **Demo:** User pastes 500 words of text; the tool accepts it without truncation.
*   `[FEAT]` **Story 1.2: User Intent Capture**
    *   **As a** user
    *   **I want to** specify what I am trying to achieve with my prompt
    *   **So that** the recommendations are tailored to my specific goal.
    *   **Demo:** User fills in a "Goal" text field before submitting.
*   `[FEAT]` **Story 1.3: Target Model Selection**
    *   **As a** user
    *   **I want to** select my intended AI model (e.g., GPT-4, Claude 3, Gemini) from a dropdown
    *   **So that** I receive model-specific formatting tips.
    *   **Demo:** User selects "Anthropic Claude" from a list.
*   `[FEAT]` **Story 1.4: PDF Upload & Extraction**
    *   **As a** user
    *   **I want to** upload a PDF document containing my prompt drafts
    *   **So that** I don't have to manually copy and paste long documents.
    *   **Demo:** User uploads a PDF; the text is populated into the input field.
*   `[FEAT]` **Story 1.5: Input Validation & Error Handling**
    *   **As a** user
    *   **I want to** be warned if my prompt is too short or if the PDF is unreadable
    *   **So that** I don't submit invalid data and get a poor assessment.
    *   **Demo:** Tool shows a "Please enter at least 10 words" warning.

### Epic 2: Prompting Knowledge Base & Rule Engine
**Goal (Business Value):** To establish the "ground truth" grading rubric based on industry standards, ensuring the assessment is accurate and educational.
**Experience (User Experience):** The user doesn't see this directly, but benefits from the system accurately flagging missing XML tags (for Claude) or missing system personas (for GPT).

*   `[FEAT]` **Story 2.1: Universal Guidelines Set**
    *   **As an** administrator/system
    *   **I want to** define a set of universal prompting rules (clarity, context, role, examples)
    *   **So that** every prompt is checked against fundamental best practices.
    *   **Demo:** System successfully loads universal rules into the assessment context.
*   `[FEAT]` **Story 2.2: OpenAI Formatting Rules**
    *   **As a** system
    *   **I want to** access specific rules for OpenAI models (e.g., Markdown use, System messages)
    *   **So that** I can apply these rules when the user selects ChatGPT.
    *   **Demo:** System identifies Markdown usage requirements for OpenAI context.
*   `[FEAT]` **Story 2.3: Anthropic Formatting Rules**
    *   **As a** system
    *   **I want to** access specific rules for Anthropic models (e.g., XML tag structuring)
    *   **So that** I can recommend XML tags when the user selects Claude.
    *   **Demo:** System identifies missing XML tags for Anthropic context.
*   `[FEAT]` **Story 2.4: Google Gemini Formatting Rules**
    *   **As a** system
    *   **I want to** access specific rules for Gemini (e.g., direct instruction style, multi-modal hints)
    *   **So that** I can provide accurate tips for Google's models.
    *   **Demo:** System applies Gemini-specific evaluation criteria.
*   `[FEAT]` **Story 2.5: Dynamic Rule Selection**
    *   **As a** system
    *   **I want to** combine the Universal rules with the selected Target Model rules
    *   **So that** the grading rubric is perfectly customized for the current submission.
    *   **Demo:** System generates a combined checklist of rules based on user dropdown selection.

### Epic 3: Assessment & Scoring System
**Goal (Business Value):** To objectively measure the quality of a prompt so the user knows exactly where they stand.
**Experience (User Experience):** After clicking "Assess", the user sees a dashboard showing an overall score (e.g., 75/100) and sub-scores for specific categories like "Clarity" and "Context".

*   `[FEAT]` **Story 3.1: Overall Prompt Score Generation**
    *   **As a** user
    *   **I want to** see an aggregate score (e.g., 0-100) for my prompt
    *   **So that** I can quickly gauge its overall quality.
    *   **Demo:** A large circular dial displays "Score: 78/100".
*   `[FEAT]` **Story 3.2: Category Sub-scoring (Clarity & Context)**
    *   **As a** user
    *   **I want to** see individual scores for Clarity and Context
    *   **So that** I know exactly which area needs the most work.
    *   **Demo:** Progress bars show "Clarity: 90%" and "Context: 40%".
*   `[FEAT]` **Story 3.3: Intent Alignment Check**
    *   **As a** user
    *   **I want to** know if my prompt actually aligns with the "Goal" I stated
    *   **So that** I can ensure the AI won't misunderstand my core objective.
    *   **Demo:** A green checkmark or red flag indicates if the prompt matches the stated goal.
*   `[FEAT]` **Story 3.4: Rule Violation Detection**
    *   **As a** system
    *   **I want to** scan the prompt and flag any broken rules from the Knowledge Base
    *   **So that** I can pass this data to the feedback engine.
    *   **Demo:** System outputs an internal list of 3 violated rules.
*   `[FEAT]` **Story 3.5: Positive Reinforcement Detection**
    *   **As a** system
    *   **I want to** identify which rules the user followed correctly
    *   **So that** the tool can praise the user for good habits.
    *   **Demo:** System outputs an internal list of 2 successfully followed rules.

---

## 📅 Medium Priority (Upcoming)

### Epic 4: Feedback & Improvement Recommendations
**Goal (Business Value):** To provide actionable learning moments and a ready-to-use perfect prompt so the user actually gets value and saves time.
**Experience (User Experience):** Below the scores, the user reads a "Pros & Cons" list explaining what they did well/poorly, and sees a "Rewritten Prompt" box they can copy-paste.

*   `[FEAT]` **Story 4.1: Pros and Cons List**
    *   **As a** user
    *   **I want to** see a clear, bulleted list of what I did right and wrong
    *   **So that** I understand the reasoning behind my score.
    *   **Demo:** UI shows a "Strengths" and "Weaknesses" panel.
*   `[FEAT]` **Story 4.2: Actionable Improvement Tips**
    *   **As a** user
    *   **I want to** receive specific suggestions (e.g., "Add a persona to this sentence")
    *   **So that** I learn how to fix the issues myself next time.
    *   **Demo:** UI displays targeted hints mapped to specific lines of the user's prompt.
*   `[FEAT]` **Story 4.3: Model-Specific Tips Display**
    *   **As a** user
    *   **I want to** see recommendations specifically tailored to the AI model I selected
    *   **So that** I can leverage unique features like Claude's XML tags.
    *   **Demo:** UI shows a special "Claude Pro-Tip" section.
*   `[FEAT]` **Story 4.4: The "Perfect" Rewritten Prompt**
    *   **As a** user
    *   **I want to** see a fully rewritten, optimized version of my prompt
    *   **So that** I can immediately use a high-quality prompt for my task.
    *   **Demo:** A text box displays the newly generated prompt.
*   `[FEAT]` **Story 4.5: Copy to Clipboard Button**
    *   **As a** user
    *   **I want to** click one button to copy the rewritten prompt
    *   **So that** I can quickly paste it into ChatGPT/Claude without manual highlighting.
    *   **Demo:** User clicks a "Copy" icon and a success toast appears.

### Epic 5: Educational Demo Showcase
**Goal (Business Value):** To guarantee a smooth, impressive presentation for the university professor without relying on live typing or spontaneous thinking.
**Experience (User Experience):** A hidden or distinct "Demo Mode" button that pre-fills the tool with classic bad prompts, instantly running them through the engine to show off the application's capabilities.

*   `[FEAT]` **Story 5.1: "Load Sample" Button**
    *   **As a** presenter
    *   **I want to** click a button that instantly fills the input and goal fields
    *   **So that** I don't have to awkwardly type a prompt during my presentation.
    *   **Demo:** Clicking "Load Bad Prompt" populates the UI instantly.
*   `[FEAT]` **Story 5.2: Pre-loaded Vague Prompt Example**
    *   **As a** presenter
    *   **I want to** showcase how the tool handles a very vague prompt (e.g., "Write code")
    *   **So that** I can demonstrate the clarity and context scoring.
    *   **Demo:** Tool loads a pre-configured 3-word prompt.
*   `[FEAT]` **Story 5.3: Pre-loaded Wrong Model Example**
    *   **As a** presenter
    *   **I want to** load a prompt styled for ChatGPT but evaluated for Claude
    *   **So that** I can show off the model-specific rule engine.
    *   **Demo:** Tool highlights the lack of XML tags in a Markdown-heavy prompt.
*   `[FEAT]` **Story 5.4: Guided Tour/Tooltips**
    *   **As a** user/presenter
    *   **I want to** see tooltips explaining what each section of the dashboard does
    *   **So that** the audience understands the value of the scores and feedback.
    *   **Demo:** Small "i" icons appear next to "Score" and "Pros/Cons" that show popovers.
*   `[FEAT]` **Story 5.5: Presentation Reset Feature**
    *   **As a** presenter
    *   **I want to** click a single button to clear all inputs and results
    *   **So that** I can smoothly transition between different examples during the demo.
    *   **Demo:** A "Clear All" button resets the app state immediately.

---

## 🧊 Icebox (Low Priority)
*   User accounts and login to save past prompts.
*   Integration directly into Jupyter Notebooks.
*   Live API connection to automatically execute the rewritten prompt and show the AI's response.