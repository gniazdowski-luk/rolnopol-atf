# rolnopol-atf

Rolnopol Automated Test Framework (ATF) is a Playwright-based end-to-end testing suite for the **Rolnopol** agricultural management system. It covers smoke tests and functional scenarios across the web UI and API (Swagger) using the Page Object Model pattern.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v20.19+, v22.13+, or v24+
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- Playwright browsers (installed separately — see below)

---

## Installation

1. Install project dependencies:

   ```bash
   npm install
   ```

2. Install Playwright browsers:

   ```bash
   npm run install:drivers
   ```

3. Configure environment variables:

   Create a `.env` file based on `.env.example`, then set `BASE_URL` to match your target environment.

---

## Test Execution

| Command                    | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| `npm test`                 | Run all tests in headless mode                           |
| `npm run test:headed`      | Run tests with a visible browser                         |
| `npm run test:debug`       | Run tests in Playwright debug mode (step-through)        |
| `npx playwright test --ui` | Open Playwright UI mode for interactive test exploration |

> **Note:** The application under test must be running at `BASE_URL` from `.env` (fallback default: `http://localhost:3000`) before executing any tests.

---

## Code Quality

The project uses ESLint, Prettier, and TypeScript for static analysis. All checks run locally via Husky pre-commit hooks and in CI.

| Command                | Description                               | Mutates files? |
| ---------------------- | ----------------------------------------- | -------------- |
| `npm run check`        | Run format + lint + type check (local)    | Yes            |
| `npm run check:ci`     | Run format:check + lint + type check (CI) | No             |
| `npm run format`       | Apply Prettier formatting                 | Yes            |
| `npm run format:check` | Validate formatting (non-TS files)        | No             |
| `npm run lint`         | Run ESLint with zero-warning policy       | No             |
| `npm run tsc:check`    | TypeScript type checking                  | No             |

**Architecture:**

- **Formatting** — Prettier handles whitespace, quotes, and semicolons. TypeScript files are checked via ESLint + `eslint-plugin-prettier`; non-TS files are checked by `prettier --check`.
- **Linting** — ESLint flat config with `typescript-eslint`, `eslint-plugin-playwright`, and `eslint-plugin-simple-import-sort`.
- **Import sorting** — Handled by ESLint (`eslint-plugin-simple-import-sort`), not Prettier.
- **Pre-commit** — Husky runs `lint-staged` (format + lint staged files) and `tsc:check`.
- **CI** — The `quality` job in the Tests workflow runs `format:check`, `lint`, and `tsc:check` before tests execute.

---

## Reporting

After a test run, open the HTML report:

```bash
npm run test:report
```

This launches the Playwright HTML reporter in your default browser, showing detailed results, traces, and screenshots for each test.

---

## Contributing

See [CODING_STANDARDS.md](./CODING_STANDARDS.md) for coding conventions and the test case registry in [TEST_PLAN.md](./TEST_PLAN.md).
