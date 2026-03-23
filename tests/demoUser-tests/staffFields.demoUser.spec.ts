import { expect, test } from "@playwright/test";
import { StaffFieldsPage } from "../../pages/StaffFieldsPage";

test("@smoke @SF-1 adding new field shows confirmation and field appears in list", async ({
  page,
}) => {
  // Arrange
  const staffFieldsPage = new StaffFieldsPage(page);
  const fieldName = `Test Pole ${Date.now()}`;

  // Act
  await staffFieldsPage.goto();
  await staffFieldsPage.openAddFieldModal();
  await staffFieldsPage.addField(fieldName, 10);

  // Assert – success message is shown
  await expect.soft(staffFieldsPage.fieldMessage).toHaveText("Field added!");

  // Assert – field is visible in filtered list
  await staffFieldsPage.fieldsSearch.fill(fieldName);
  await expect(page.getByText(fieldName, { exact: true })).toBeVisible();
});
