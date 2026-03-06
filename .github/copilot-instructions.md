# Conventional Commits (Simple)

Use this format for every commit:

`type(scope): short summary`

Scope is optional:

`type: short summary`

Allowed types:

- `feat`
- `fix`
- `docs`
- `style`
- `refactor`
- `test`
- `chore`
- `ci`

Rules:

- Use lowercase `type` (and lowercase `scope` if used).
- Keep summary short and imperative (example: "add login smoke test").
- No period at the end of summary.
- For breaking changes, use `!` (example: `feat(api)!: rename auth endpoint`) and add `BREAKING CHANGE:` in the body.

Examples:

- `feat(tests): add login smoke test`
- `fix(config): update staging base url`
- `docs: update setup steps`

## Test Plan and Tagging System

This project uses the Playwright Test framework for automated testing.

Before creating or updating tests, review `playwright.config.ts` to align with current test settings (such as projects, retries, timeouts, base URL, and reporters).

When creating or updating automated tests:

- Structure every test using the **Arrange / Act / Assert** (AAA) pattern with inline comments:
  - `// Arrange` — set up test data and expected values.
  - `// Act` — perform navigation and user interactions.
  - `// Assert` — verify the outcome with `expect` calls.
  - Omit `// Arrange` if there is no setup needed (e.g., no expected values object).
- Include tags directly in test titles (example: "@smoke @API-1 swagger page should be visible and loaded").
- Try to use test id if available.
- Never use `page.locator("body")` assertions (for example, avoid `toBeVisible()` on `body`).
- Prefer assertions on meaningful page-specific elements (or URL) for page-load validation; avoid title checks unless the test explicitly verifies the title.
- Always document every new test in `TEST_PLAN.md` under the appropriate section (for example, section 3.1 for smoke tests).
