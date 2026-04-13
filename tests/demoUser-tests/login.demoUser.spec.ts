import { expect, test } from '@playwright/test';

import { ProfilePage } from '../../pages/ProfilePage';
import { URLs } from '../../pages/urls';
import { createDemoUser } from '../../src/models/userFactory';

test('@smoke @LOGIN-2 profile sections are visible and logout returns to home', async ({
  page,
}) => {
  // Arrange
  const profilePage = new ProfilePage(page);
  // Act – navigate to profile (authenticated via stored session)
  await profilePage.goto();

  // Assert – required profile sections are visible
  await expect.soft(profilePage.profileInformationHeading).toBeVisible();
  await expect.soft(profilePage.updateProfileHeading).toBeVisible();
  await expect.soft(profilePage.dangerZoneHeading).toBeVisible();

  // Act – log out
  await profilePage.logout();

  // Assert – redirected to home page
  await expect(page).toHaveURL(URLs.home);
});

test('@smoke @LOGIN-3 profile page displays correct user data', async ({
  page,
}) => {
  // Arrange
  const profilePage = new ProfilePage(page);
  const user = createDemoUser();

  // Act – navigate to profile (authenticated via stored session)
  await profilePage.goto();

  // Assert – profile header shows user's display name and email
  await expect.soft(profilePage.profileHeader).toContainText(user.displayName!);
  await expect.soft(profilePage.profileHeader).toContainText(user.email);

  // Assert – Profile Information section shows correct email and display name
  await expect.soft(profilePage.emailValue).toHaveText(user.email);
  await expect(profilePage.displayedName).toHaveText(user.displayName!);
});
