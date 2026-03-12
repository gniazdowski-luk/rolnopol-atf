import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { URLs } from "./urls";

export class LoginPage extends BasePage {
  protected readonly url = URLs.login;

  readonly form: Locator;
  readonly subtitle: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.form = page.getByTestId("login-form");
    this.subtitle = page.getByTestId("login-subtitle");
    this.submitButton = page.getByTestId("login-submit-btn");
  }
}
