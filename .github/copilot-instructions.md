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

- Include meaningful tags directly in test titles (domain + priority, plus scenario tags when applicable).
- Try to use test id if available.
- Never use `page.locator("body")` assertions (for example, avoid `toBeVisible()` on `body`).
- Prefer assertions on meaningful page-specific elements (or URL) for page-load validation; avoid title checks unless the test explicitly verifies the title.
