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

## Testing

This project uses the Playwright Test framework. All coding standards, patterns, and tagging conventions are defined in [CODING_STANDARDS.md](../CODING_STANDARDS.md).

When creating or updating tests:

- Review `playwright.config.ts` before writing or modifying tests to align with current settings (projects, retries, timeouts, base URL, reporters).
- Each test should cover only one scenario.
- Each test should have only one final hard assertion, though multiple soft assertions are allowed before it.
- Always document every new test in `TEST_PLAN.md` under the appropriate section (for example, section 3.1 for smoke tests).

## Environment and Credentials

- Never read the `.env` file.
- Use `#file:.env.ai` for accessing credentials for AI.
