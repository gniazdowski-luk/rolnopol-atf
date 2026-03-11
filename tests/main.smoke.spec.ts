import { expect, test } from "@playwright/test";
import { DocsPage } from "../pages/DocsPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { SwaggerPage } from "../pages/SwaggerPage";
import { generateEmail } from "../src/helpers/generateEmail";

test("@smoke @HOME-1 should display Rolnopol in page title", async ({
  page,
}) => {
  // Arrange
  const homePage = new HomePage(page);
  const expected = {
    titlePattern: /Rolnopol/,
  };

  // Act
  await homePage.goto();

  // Assert
  await expect(page).toHaveTitle(expected.titlePattern);
});

test("@smoke @LOGIN-1 login page should be visible and loaded", async ({
  page,
}) => {
  // Arrange
  const loginPage = new LoginPage(page);
  const expected = {
    subtitle: "User Login & Account Access",
    submitButtonText: "Login",
  };

  // Act
  await loginPage.goto();

  // Assert
  await expect.soft(loginPage.form).toBeVisible();
  await expect.soft(loginPage.subtitle).toContainText(expected.subtitle);
  await expect(loginPage.submitButton).toHaveText(expected.submitButtonText);
});

test("@smoke @API-1 swagger page should be visible and loaded", async ({
  page,
}) => {
  // Arrange
  const swaggerPage = new SwaggerPage(page);

  // Act
  await swaggerPage.goto();

  // Assert
  await expect.soft(swaggerPage.swaggerFrame).toBeVisible();
  await expect(swaggerPage.swaggerTitle).toContainText(/Rolnopol/);
});

test("@smoke @DOCS-1 docs page should be visible and loaded", async ({
  page,
}) => {
  // Arrange
  const docsPage = new DocsPage(page);
  const expected = {
    sidebarTitle: "Contents",
  };

  // Act
  await docsPage.goto();

  // Assert
  await expect.soft(docsPage.sidebarTitle).toContainText(expected.sidebarTitle);
  await expect.soft(docsPage.nav).toBeVisible();
  await expect(docsPage.content).toBeVisible();
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
