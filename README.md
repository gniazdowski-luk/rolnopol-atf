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

## Contributing

See [CODING_STANDARDS.md](./CODING_STANDARDS.md) for coding conventions and the test case registry in [TEST_PLAN.md](./TEST_PLAN.md).