import { type Locator, type Page } from '@playwright/test';

import { BasePage } from './BasePage';
import { URLs } from './urls';

export class RegisterPage extends BasePage {
  protected readonly url = URLs.register;

  readonly form: Locator;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly displayNameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly alert: Locator;

  constructor(page: Page) {
    super(page);
    this.form = page.getByTestId('register-form');
    this.subtitle = page.getByTestId('register-subtitle');
    this.emailInput = page.getByTestId('email-input');
    this.displayNameInput = page.getByTestId('display-name-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = page.getByTestId('register-submit-btn');
    this.alert = page.getByRole('alert');
  }

  async register(
    email: string,
    password: string,
    displayName?: string,
  ): Promise<void> {
    await this.emailInput.fill(email);
    if (displayName !== undefined) {
      await this.displayNameInput.fill(displayName);
    }
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
