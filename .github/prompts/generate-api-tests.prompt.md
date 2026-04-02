---
name: generate-api-tests
description: "Generate Playwright REST API tests for a specified endpoint or module. Use when: creating API tests, adding new API test coverage, scaffolding api spec files."
argument-hint: "Endpoint or module name (e.g. 'register', 'login', 'users')"
agent: agent
---

Generate Playwright REST API tests for the endpoint or module: **$input**

## Step 1 — Fetch the OpenAPI schema

Fetch the schema from `http://localhost:3000/schema/openapi.json` and find all operations that belong to the requested endpoint/module. Extract for each operation:

- HTTP method and path
- Required and optional request body fields with their types and validation rules (minLength, format, etc.)
- Possible response status codes and their meaning

## Step 2 — Identify test cases

Based on the schema, derive the full set of test cases. Cover at minimum:

- Happy path (successful operation with valid input)
- Each required field missing individually → expect 400
- Each field with an invalid value (wrong format, below minLength, etc.) → expect 400
- Conflict / duplicate scenarios if the endpoint implies unique constraints → expect 409
- Unauthorized / unauthenticated access if security is declared → expect 401 or 403

## Step 3 — Determine the next @API-N tag number

Check [TEST_PLAN.md](../../TEST_PLAN.md) and look at the existing tests to find the next available `@API-N` number. Each new test gets a consecutive tag.

## Step 4 — Generate the test file

Create the file at `tests/api-tests/<module>.api.spec.ts` following this exact structure:

```ts
import { expect, test } from "@playwright/test";
// Import helpers as needed, e.g. generateEmail

const <MODULE>_ENDPOINT = "<endpoint-path-without-leading-slash>";

// One factory function per request body shape used in the suite.
// Use Partial<> overrides so individual tests can omit or override fields.
function create<Module>Body(
  overrides?: Partial<{
    // list all fields
  }>,
) {
  return {
    // sensible valid defaults
    ...overrides,
  };
}

test.describe("<Module> API", () => {
  test("@api @API-N <short imperative description>", async ({ request }) => {
    // Arrange
    const body = create<Module>Body();

    // Act
    const response = await request.post(<MODULE>_ENDPOINT, { data: body });
    const json = await response.json();

    // Assert
    await expect
      .soft(response, "<meaningful soft assertion message>")
      .toBeOK();
    expect(json.<field>, "<meaningful hard assertion message>").toBe(<value>);
  });

  // ... remaining tests
});
```

### Coding rules to follow

- Follow [CODING_STANDARDS.md](../../CODING_STANDARDS.md) and [playwright.config.ts](../../playwright.config.ts).
- Each test covers exactly **one** scenario.
- Each test has exactly **one hard `expect`** as the last assertion. All earlier assertions use `expect.soft`.
- Use destructuring to omit a field (e.g. `const { email, ...body } = create<Module>Body();`) rather than passing `undefined`.
- Every `expect` and `expect.soft` call must include a descriptive human-readable message as its second argument.
- Tests must be **independent** — no shared mutable state between tests; each test creates its own data.
- Keep the factory function(s) at the top of the file, outside `test.describe`.
- Use `generateEmail()` from `../../src/helpers/generateEmail` when a unique email is needed.
- Tag format: `@api @API-N` where N is the next available number from TEST_PLAN.md.

## Step 5 — Update TEST_PLAN.md

Add a new row for every generated test in the appropriate section of [TEST_PLAN.md](../../TEST_PLAN.md) using the same format as existing rows.
