import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { URLs } from "./urls";

export class ProfilePage extends BasePage {
  readonly url = URLs.profile;

  readonly profileInformationHeading: Locator;
  readonly updateProfileHeading: Locator;
  readonly dangerZoneHeading: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.profileInformationHeading = page.getByRole("heading", {
      name: "Profile Information",
    });
    this.updateProfileHeading = page.getByRole("heading", {
      name: "Update Profile",
    });
    this.dangerZoneHeading = page.getByRole("heading", {
      name: "Danger Zone",
    });
    this.logoutButton = page.getByTestId("logout-btn").first();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
