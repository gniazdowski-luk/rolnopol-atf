import { expect, test } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage";
import { generateEmail } from "../../src/helpers/generateEmail";

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

test("@smoke @REG-3 registration with too short password should show error", async ({
  page,
}) => {
  // Arrange
  const registerPage = new RegisterPage(page);

  // Act
  await registerPage.goto();
  await registerPage.register("valid@email.com", "ab", "TestUser");

  // Assert
  await expect.soft(page).toHaveURL(/register\.html/);
  await expect(registerPage.alert).toContainText(
    "Password must be at least 3 characters",
  );
});

test("@smoke @REG-4 registration with invalid email should show error", async ({
  page,
}) => {
  // Arrange
  const registerPage = new RegisterPage(page);

  // Act
  await registerPage.goto();
  await registerPage.emailInput.fill("notanemail");
  await registerPage.passwordInput.fill("test123");
  await registerPage.submitButton.click();

  // Assert
  await expect.soft(page).toHaveURL(/register\.html/);
  await expect(registerPage.alert).toContainText(
    "Please enter a valid email address",
  );
});

test("@smoke @REG-5 registration with too short display name should show error", async ({
  page,
}) => {
  // Arrange
  const registerPage = new RegisterPage(page);

  // Act
  await registerPage.goto();
  await registerPage.emailInput.fill("valid@email.com");
  await registerPage.displayNameInput.fill("AB");
  await registerPage.passwordInput.fill("test123");
  await registerPage.submitButton.click();

  // Assert
  await expect.soft(page).toHaveURL(/register\.html/);
  await expect(registerPage.alert).toContainText(
    "Display name must be at least 3 characters",
  );
});
