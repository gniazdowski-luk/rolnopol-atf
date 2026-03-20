import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { URLs } from "./urls";

export class ProfilePage extends BasePage {
  readonly url = URLs.profile;

  readonly profileInformationHeading: Locator;
  readonly updateProfileHeading: Locator;
  readonly dangerZoneHeading: Locator;
  readonly logoutButton: Locator;
  readonly profileHeader: Locator;
  readonly displayedName: Locator;
  readonly emailValue: Locator;

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
    this.profileHeader = page.getByTestId("profile-header");
    this.displayedName = page.getByTestId("displayed-name");
    this.emailValue = page.getByTestId("email-value");
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
