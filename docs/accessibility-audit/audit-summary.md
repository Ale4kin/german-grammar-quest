# Accessibility Audit Summary

Date: 2026-06-25
Target: local app at `http://127.0.0.1:3000`
Standard: WCAG 2.2 AA

This audit combined source inspection, rendered DOM inspection via headless Chrome, and screenshot review. It did not include a full keyboard traversal or a full screen-reader session because Playwright browser automation was not fully available in the current environment.

## Scope checked

- Home: `/`
- Map: `/map`
- Lesson: `/lesson/a1-articles?mode=explorer`
- Exercise: `/exercise/ex-001?mode=explorer`
- Profile: `/profile`
- Result: `/result?lessonId=a1-articles&gems=35&correct=9&total=12&streak=2&bestStreak=3&hints=1&firstTryCount=8&mode=explorer&runId=audit-run`

## Critical issues

### 1. Progress bars are visual-only
- Affected files:
  - [components/game/exercise-runner.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/exercise-runner.tsx:310)
  - [components/game/map-progress-panel.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/map-progress-panel.tsx:57)
  - [components/game/profile-overview.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/profile-overview.tsx:55)
- Why it matters:
  Screen readers do not get a semantic progress value for run progress or XP progress. This directly affects the game-specific requirement that progress be understandable without relying on visuals.
- How to fix:
  Use a semantic `progress` element or `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and an accessible label. Keep the visible text summary next to it.

### 2. Answer feedback and hint updates are not announced
- Affected file:
  - [components/game/exercise-runner.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/exercise-runner.tsx:421)
- Why it matters:
  After an answer is submitted, the new feedback block, explanation, streak change, and hint state appear visually but are not exposed as a live update. A screen-reader user may not know that the page state changed.
- How to fix:
  Add a polite live region for answer feedback and hint state, or move focus to the feedback heading after submission. Make sure correct/incorrect, explanation, gems, and streak reset/reward are included in announced text.

## Important issues

### 3. Mode cards use weak disclosure/toggle semantics
- Affected file:
  - [components/game/mode-selector.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/mode-selector.tsx:43)
- Why it matters:
  The cards open a detail panel on hover/focus/click, but the triggers only expose `aria-pressed`. That does not describe the relationship to the preview content. The "coming soon" modes are also still interactive buttons without disabled semantics.
- How to fix:
  Treat this as a disclosure pattern: use `aria-expanded`, `aria-controls`, and an `id` on the details panel. If a mode is unavailable, either make it non-interactive text or use `disabled` / `aria-disabled="true"` with a clear explanation.

### 4. No skip link or other bypass for repeated top navigation
- Affected files:
  - [app/layout.tsx](/Users/alevtinalebedeva/Documents/German grammar/app/layout.tsx:16)
  - [components/layout/app-chrome.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/layout/app-chrome.tsx:11)
- Why it matters:
  Keyboard and screen-reader users must move through the sticky global navigation on every page load. WCAG 2.4.1 expects a bypass mechanism for repeated blocks.
- How to fix:
  Add a visible-on-focus "Skip to main content" link targeting the page `main` element.

### 5. Mobile / zoom layout breaks on the home page
- Evidence:
  - `docs/accessibility-audit/home-mobile.png`
- Affected file:
  - [app/page.tsx](/Users/alevtinalebedeva/Documents/German grammar/app/page.tsx:55)
- Why it matters:
  At narrow mobile width, the secondary CTA is clipped off on the right. This is a strong indicator that 200% zoom and smaller viewport use will not remain fully operable.
- How to fix:
  Let the CTA group stack earlier, allow buttons to wrap to full width, and test at mobile widths plus 200% zoom. Avoid fixed-width visual pressure in button rows.

### 6. Workflow and rules are presented with generic containers instead of list semantics
- Affected files:
  - [app/page.tsx](/Users/alevtinalebedeva/Documents/German grammar/app/page.tsx:80)
  - [components/game/mode-selector.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/mode-selector.tsx:106)
  - [app/lesson/[lessonId]/page.tsx](/Users/alevtinalebedeva/Documents/German grammar/app/lesson/[lessonId]/page.tsx:132)
  - [app/result/page.tsx](/Users/alevtinalebedeva/Documents/German grammar/app/result/page.tsx:195)
- Why it matters:
  Ordered steps and rule lists lose structure for assistive tech. Bullet characters inside `li` also create redundant speech.
- How to fix:
  Use semantic `ol` for sequenced steps and `ul` for rule lists. Remove decorative bullet characters from the text content.

### 7. Focus indicator contrast is likely too weak on pale surfaces
- Affected file:
  - [app/globals.css](/Users/alevtinalebedeva/Documents/German grammar/app/globals.css:264)
- Why it matters:
  The focus outline uses a semi-transparent green on very light backgrounds. That is visually subtle and may fail WCAG 2.4.11 expectations for visible focus.
- How to fix:
  Use a solid, higher-contrast outline or a dual-ring treatment that clearly separates from both light cards and tinted chips.

### 8. Motion is not reduced for users who request it
- Affected files:
  - [app/globals.css](/Users/alevtinalebedeva/Documents/German grammar/app/globals.css:95)
  - [components/game/exercise-runner.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/exercise-runner.tsx:317)
  - [components/game/profile-overview.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/profile-overview.tsx:58)
  - [components/game/map-progress-panel.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/map-progress-panel.tsx:59)
- Why it matters:
  Hover motion and animated progress changes continue regardless of `prefers-reduced-motion`.
- How to fix:
  Add a reduced-motion media query and remove non-essential transitions and transforms under that preference.

## Nice-to-have improvements

### 9. Emoji should not carry any unique meaning
- Affected files:
  - [app/page.tsx](/Users/alevtinalebedeva/Documents/German grammar/app/page.tsx:35)
  - [components/game/exercise-runner.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/exercise-runner.tsx:442)
  - [components/game/result-unlocks-panel.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/result-unlocks-panel.tsx:58)
  - [app/map/page.tsx](/Users/alevtinalebedeva/Documents/German grammar/app/map/page.tsx:91)
- Why it matters:
  Most emoji are paired with text already, which is good. The remaining issue is consistency: decorative emoji should be hidden, and meaningful emoji should never be the only status signal.
- How to fix:
  Mark decorative emoji `aria-hidden="true"` and keep the text label as the source of meaning.

### 10. Daily quest cards could expose state more explicitly
- Affected file:
  - [components/game/map-progress-panel.tsx](/Users/alevtinalebedeva/Documents/German grammar/components/game/map-progress-panel.tsx:75)
- Why it matters:
  "Claim" is only shown when a quest is claimable. That is workable, but the control state is not as explicit as it could be for assistive tech and keyboard users.
- How to fix:
  Consider keeping a disabled button visible with a clear label, or add explicit state text tied to the quest title via `aria-describedby`.

## What looked good

- Core navigation uses real links.
- Main page regions generally use `main`, `header`, and `nav`.
- Answer options and hint controls are real buttons.
- Correct/incorrect feedback includes text, not only color.
- Most gem/streak/status chips include text, not just emoji.

## Tooling status

- `eslint-plugin-jsx-a11y`: not configured in project ESLint today.
- `axe-core`: available in the environment, but not wired into the repo.
- Playwright package: available in the environment, but browser bundle missing for direct automation.
- Smallest useful next setup, without overbuilding:
  1. Add ESLint with `eslint-plugin-jsx-a11y`.
  2. Add one Playwright accessibility smoke test for `/`, `/map`, `/lesson/...`, `/exercise/...`.
  3. Add `axe-core` checks in that smoke test.
