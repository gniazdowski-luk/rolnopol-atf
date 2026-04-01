# Coding Standards

## Page Object Pattern

Page Objects encapsulate page structure and interactions. They live in `pages/`.

### Rules

**Locators** — declare all locators as `readonly` properties in the constructor.

```ts
readonly submitButton: Locator;

constructor(page: Page) {
  this.submitButton = page.getByTestId("register-submit-btn");
}
```

**Action methods** — expose actions as `async` methods. Methods perform interactions only; they do not verify outcomes.

```ts
async register(email: string, password: string, displayName?: string) {
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.submitButton.click();
}
```

**No assertions in Page Objects.** Never use `expect` inside a Page Object. All verifications belong in test files.

```ts
// ✗ Wrong — assertion inside a Page Object
async goto() {
  await this.page.goto("/register.html");
  await expect(this.form).toBeVisible(); // must not be here
}

// ✓ Correct — action only
async goto() {
  await this.page.goto("/register.html");
}
```

---

## Test Files

Tests live in `tests/`. Use the **Arrange / Act / Assert** pattern with inline comments.

```ts
test("@smoke @REG-1 register page should be visible and loaded", async ({
  page,
}) => {
  // Arrange
  const registerPage = new RegisterPage(page);
  const expected = { subtitle: "Create Your User Account" };

  // Act
  await registerPage.goto();

  // Assert
  await expect(registerPage.form).toBeVisible();
  await expect(registerPage.subtitle).toContainText(expected.subtitle);
});
```

- Omit `// Arrange` when there is no setup needed.
- Each test must have **exactly one hard assertion**, and it must be the **last assertion** in the test. All preceding assertions must use `expect.soft`.
- URL assertions must reference the `url` property of the corresponding Page Object (e.g. `profilePage.url`) rather than hardcoding strings or regex literals.
- Do not assert on `page.locator("body")`.
- Prefer test IDs (`getByTestId`) or semantic locators over CSS selectors.
- Prefer assertions on meaningful page-specific elements (or URL) for page-load validation; avoid title checks unless the test explicitly verifies the title.

---

## Tagging

Include tags in the test title: `@smoke @AREA-N short description`.

| Area           | Prefix  |
| -------------- | ------- |
| Home           | `HOME`  |
| Login          | `LOGIN` |
| Register       | `REG`   |
| API / Swagger  | `API`   |
| Docs           | `DOCS`  |
| Staff & Fields | `SF`    |
| Footer         | `FTR`   |

Increment `N` per area independently. Check `TEST_PLAN.md` for the next available number.

---

## Helpers

Pure utility functions live in `src/helpers/`. They must have no side effects and no Playwright dependencies.

```ts
// src/helpers/generateEmail.ts
export function generateEmail(): string {
  return `user_${Date.now()}@test.com`;
}
```

---

## File Locations

| Type         | Location       |
| ------------ | -------------- |
| Page Objects | `pages/`       |
| Tests        | `tests/`       |
| Helpers      | `src/helpers/` |
