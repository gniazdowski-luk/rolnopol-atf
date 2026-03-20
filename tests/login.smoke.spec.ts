import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";

test("@smoke @LOGIN-2 successful login redirects to profile with required sections visible, logout returns to home", async ({
  page,
}) => {
  // Arrange
  const loginPage = new LoginPage(page);
  const profilePage = new ProfilePage(page);
  const homePage = new HomePage(page);
  const credentials = {
    email: "emptyuser@rolnopol.demo.pl",
    password: "demoPass123",
  };

  // Act – navigate to login and submit credentials
  await loginPage.goto();
  await loginPage.login(credentials.email, credentials.password);

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
