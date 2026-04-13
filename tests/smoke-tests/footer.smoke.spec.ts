import { expect, test } from '@playwright/test';

import { HomePage } from '../../pages/HomePage';

test('@smoke @FTR-1 footer should be visible and contain copyright text', async ({
  page,
}) => {
  // Arrange
  const homePage = new HomePage(page);
  const expected = { copyrightPattern: /© \d{4} Rolnopol/ };

  // Act
  await homePage.goto();

  // Assert
  await expect.soft(homePage.footer).toBeVisible();
  await expect(homePage.footer).toContainText(expected.copyrightPattern);
});

test('@smoke @FTR-2 footer should have contact navigation link', async ({
  page,
}) => {
  // Arrange
  const homePage = new HomePage(page);

  // Act
  await homePage.goto();

  // Assert
  await expect.soft(homePage.footerNav).toBeVisible();
  await expect(homePage.footerContactLink).toBeVisible();
});

test('@smoke @FTR-3 footer should have jaktestowac.pl and AI_Testers links', async ({
  page,
}) => {
  // Arrange
  const homePage = new HomePage(page);

  // Act
  await homePage.goto();

  // Assert
  await expect.soft(homePage.footerJaktestowacLink).toBeVisible();
  await expect(homePage.footerAiTestersLink).toBeVisible();
});
