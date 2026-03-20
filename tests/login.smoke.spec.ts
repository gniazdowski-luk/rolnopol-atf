import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { createDefaultUser } from "../src/models/userFactory";

test("@smoke @LOGIN-3 profile page displays correct user data after login", async ({
  page,
}) => {
  // Arrange
  const loginPage = new LoginPage(page);
  const profilePage = new ProfilePage(page);
  const user = createDefaultUser();

  // Act
  await loginPage.goto();
  await loginPage.login(user.email, user.password);

  // Assert – profile header shows user's display name and email
  await expect.soft(profilePage.profileHeader).toContainText(user.displayName!);
  await expect.soft(profilePage.profileHeader).toContainText(user.email);

  // Assert – Profile Information section shows correct email and display name
  await expect.soft(profilePage.emailValue).toHaveText(user.email);
  await expect(profilePage.displayedName).toHaveText(user.displayName!);
});

test("@smoke @LOGIN-2 successful login redirects to profile with required sections visible, logout returns to home", async ({
  page,
}) => {
  // Arrange
  const loginPage = new LoginPage(page);
  const profilePage = new ProfilePage(page);
  const homePage = new HomePage(page);
  const user = createDefaultUser();

  // Act – navigate to login and submit credentials
  await loginPage.goto();
  await loginPage.login(user.email, user.password);

  // Assert – redirected to profile page after successful login
  await expect.soft(page).toHaveURL(profilePage.url);

  // Assert – required profile sections are visible
  await expect.soft(profilePage.profileInformationHeading).toBeVisible();
  await expect.soft(profilePage.updateProfileHeading).toBeVisible();
  await expect.soft(profilePage.dangerZoneHeading).toBeVisible();

  // Act – log out
  await profilePage.logout();

  // Assert – redirected to home page
  await expect(page).toHaveURL(homePage.url);
});
