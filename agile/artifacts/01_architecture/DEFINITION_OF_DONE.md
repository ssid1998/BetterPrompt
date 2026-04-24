# Definition of Done (DoD)

**Project:** BetterPrompt
**Status:** Active

This Definition of Done ensures that every User Story meets our quality standards before being moved to "Done." For a university project evaluating natural language, accuracy and stability are critical.

## 1. Code & Technical Quality
- [ ] Code compiles and builds without errors in Next.js (`npm run build`).
- [ ] No exposed secrets or API Keys (OpenAI keys must be restricted to server-side code only).
- [ ] Backend routes (API) handle failed LLM calls gracefully (e.g., timeouts, OpenAI rate limits) without crashing the frontend.
- [ ] The `Rules JSON Matrix` (Knowledge Base) is updated if the feature alters scoring logic.

## 2. User Experience (UX) & UI
- [ ] Feature works across modern browsers (Chrome, Firefox, Safari).
- [ ] UI is responsive and usable on standard laptop and tablet screens.
- [ ] Loading states (spinners/skeletons) are implemented, specifically because LLM API calls take 3-10 seconds to generate feedback and rewrites.
- [ ] All error messages are user-friendly (e.g., "We couldn't read that PDF" instead of "Error 500: Buffer failed").

## 3. Architecture Alignment
- [ ] Feature adheres to the DRY principle (Don't Repeat Yourself), specifically reusing the Rules JSON for both the LLM and the Educational Learning Hub.
- [ ] Context Injection logic correctly merges the Universal Rules + Model-Specific rules before sending to the LLM.

## 4. Documentation & Demo Readiness
- [ ] New features are documented in the project `README.md` if they change core functionality.
- [ ] The "Demo Showcase" mode (Epic 5) still functions correctly and has been tested with the new feature.