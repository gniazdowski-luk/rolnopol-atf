import { expect, test } from "@playwright/test";

test("@system @smoke @p4 should display Rolnopol in page title", async ({
  page,
}) => {
  const expected = {
    titlePattern: /Rolnopol/,
  };

  await page.goto("/");
  await expect(page).toHaveTitle(expected.titlePattern);
});

test("@auth @smoke @p1 login page should be visible and loaded", async ({
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

test("@auth @smoke @p1 register page should be visible and loaded", async ({
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
