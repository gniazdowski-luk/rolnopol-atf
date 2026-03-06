import { expect, test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { generateEmail } from "../src/helpers/generateEmail";

test("@smoke @HOME-1 should display Rolnopol in page title", async ({
  page,
}) => {
  // Arrange
  const expected = {
    titlePattern: /Rolnopol/,
  };

  // Act
  await page.goto("/");

  // Assert
  await expect(page).toHaveTitle(expected.titlePattern);
});

test("@smoke @LOGIN-1 login page should be visible and loaded", async ({
  page,
}) => {
  // Arrange
  const expected = {
    subtitle: "User Login & Account Access",
    submitButtonText: "Login",
  };

  // Act
  await page.goto("/login.html");

  // Assert
  await expect.soft(page.getByTestId("login-form")).toBeVisible();
  await expect
    .soft(page.getByTestId("login-subtitle"))
    .toContainText(expected.subtitle);
  await expect(page.getByTestId("login-submit-btn")).toHaveText(
    expected.submitButtonText,
  );
});

test("@smoke @API-1 swagger page should be visible and loaded", async ({
  page,
}) => {
  // Act
  await page.goto("/swagger.html");

  // Assert
  await expect.soft(page.locator("#swagger-frame")).toBeVisible();

  const swaggerFrame = page.frameLocator("#swagger-frame");
  const titleLocator = swaggerFrame.locator("h2.title");
  await expect(titleLocator).toContainText(/Rolnopol/);
});

test("@smoke @DOCS-1 docs page should be visible and loaded", async ({
  page,
}) => {
  // Arrange
  const expected = {
    sidebarTitle: "Contents",
  };

  // Act
  await page.goto("/docs.html");

  // Assert
  await expect
    .soft(page.getByTestId("docs-sidebar-title"))
    .toContainText(expected.sidebarTitle);
  await expect.soft(page.getByTestId("docs-nav")).toBeVisible();
  await expect(page.getByTestId("docs-content")).toBeVisible();
});

test("@smoke @REG-1 register page should be visible and loaded", async ({
  page,
}) => {
  // Arrange
  const registerPage = new RegisterPage(page);
  const expected = {
    subtitle: "Create Your User Account",
    submitButtonText: "Create Account",
  };

  // Act
  await registerPage.goto();

  // Assert
  await expect.soft(registerPage.form).toBeVisible();
  await expect.soft(registerPage.subtitle).toContainText(expected.subtitle);
  await expect(registerPage.submitButton).toContainText(
    expected.submitButtonText,
  );
});

test("@smoke @REG-2 successful user registration", async ({ page }) => {
  // Arrange
  const registerPage = new RegisterPage(page);
  const email = generateEmail();

  // Act
  await registerPage.goto();
  await registerPage.register(email, "test123", "Test User");

  // Assert
  await expect
    .soft(registerPage.alert)
    .toContainText("Registration successful!");
  await expect(page).toHaveURL(/login\.html/);
});
