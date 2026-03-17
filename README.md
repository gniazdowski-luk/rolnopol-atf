# rolnopol-atf

Rolnopol Automated Test Framework (ATF) is a Playwright-based end-to-end testing suite for the **Rolnopol** agricultural management system. It covers smoke tests and functional scenarios across the web UI and API (Swagger) using the Page Object Model pattern.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
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

---

## Test Execution

| Command | Description |
| --- | --- |
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with a visible browser |
| `npm run test:debug` | Run tests in Playwright debug mode (step-through) |
| `npx playwright test --ui` | Open Playwright UI mode for interactive test exploration |

> **Note:** The application under test must be running at the base URL configured in `playwright.config.ts` (default: `http://localhost:3000`) before executing any tests.

---

## Reporting

After a test run, open the HTML report:

```bash
npm run test:report
```

This launches the Playwright HTML reporter in your default browser, showing detailed results, traces, and screenshots for each test.

---

## Core Technologies

| Technology | Role |
| --- | --- |
| [Playwright](https://playwright.dev/) | Browser automation and test runner |
| [TypeScript](https://www.typescriptlang.org/) | Primary language |
| Node.js | Runtime environment |

---

## Project Structure

```
rolnopol-atf/
├── pages/            # Page Object classes (one per application page)
├── tests/            # Test specification files
├── src/
│   └── helpers/      # Pure utility functions (no Playwright dependencies)
├── playwright.config.ts  # Playwright configuration
├── CODING_STANDARDS.md   # Contribution and coding guidelines
└── TEST_PLAN.md          # Test plan and case registry
```

---

## Coding Standards

All contributors should follow the guidelines defined in [CODING_STANDARDS.md](./CODING_STANDARDS.md). Key rules include:

- Page Objects live in `pages/` and must not contain assertions.
- Tests follow the **Arrange / Act / Assert** pattern with inline comments.
- Tags are included in test titles (e.g. `@smoke @REG-1`).
- Helper functions live in `src/helpers/` and must be side-effect free.
- Every new test must be documented in [TEST_PLAN.md](./TEST_PLAN.md) under the appropriate section (e.g., section 3.1 for smoke tests).