import { test as setup } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { DEMO_USER_AUTH_FILE } from '../../playwright.config';
import { createDemoUser } from '../../src/models/userFactory';

setup('authenticate as demo user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const user = createDemoUser();

  await loginPage.goto();
  await loginPage.login(user.email, user.password);
  await page.waitForURL(/profile\.html/);

  await page.context().storageState({ path: DEMO_USER_AUTH_FILE });
});
