import { expect, test } from "@playwright/test";

test("@smoke @SM1 should display Rolnopol in page title", async ({ page }) => {
  const expected = {
    titlePattern: /Rolnopol/,
  };

  await page.goto("/");
  await expect(page).toHaveTitle(expected.titlePattern);
});

test("@smoke @SM2 login page should be visible and loaded", async ({
  page,
}) => {
  const expected = {
    subtitle: "User Login & Account Access",
    submitButtonText: "Login",
  };

  await page.goto("/login.html");

  await expect.soft(page.getByTestId("login-form")).toBeVisible();
  await expect
    .soft(page.getByTestId("login-subtitle"))
    .toContainText(expected.subtitle);
  await expect(page.getByTestId("login-submit-btn")).toHaveText(
    expected.submitButtonText,
  );
});

test("@smoke @SM3 register page should be visible and loaded", async ({
  page,
}) => {
  const expected = {
    subtitle: "Create Your User Account",
    submitButtonText: "Create Account",
  };

  await page.goto("/register.html");

  await expect.soft(page.getByTestId("register-form")).toBeVisible();
  await expect
    .soft(page.getByTestId("register-subtitle"))
    .toContainText(expected.subtitle);
  await expect(page.getByTestId("register-submit-btn")).toContainText(
    expected.submitButtonText,
  );
});

test("@smoke @SM4 swagger page should be visible and loaded", async ({
  page,
}) => {
  await page.goto("/swagger.html");

  await expect.soft(page.locator("#swagger-frame")).toBeVisible();

  const swaggerFrame = page.frameLocator("#swagger-frame");
  const titleLocator = swaggerFrame.locator("h2.title");
  await expect(titleLocator).toContainText(/Rolnopol/);
});

test("@smoke @SM5 docs page should be visible and loaded", async ({ page }) => {
  const expected = {
    sidebarTitle: "Contents",
  };

  await page.goto("/docs.html");

  await expect
    .soft(page.getByTestId("docs-sidebar-title"))
    .toContainText(expected.sidebarTitle);
  await expect.soft(page.getByTestId("docs-nav")).toBeVisible();
  await expect(page.getByTestId("docs-content")).toBeVisible();
});
