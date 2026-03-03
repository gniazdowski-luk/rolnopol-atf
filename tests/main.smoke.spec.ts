import { expect, test } from "@playwright/test";

test("should display Rolnopol in page title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Rolnopol/);
});
