import { expect, test } from "@playwright/test";
import { DocsPage } from "../pages/DocsPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SwaggerPage } from "../pages/SwaggerPage";

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
