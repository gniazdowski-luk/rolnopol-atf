import { type Locator, type Page } from '@playwright/test';

import { BasePage } from './BasePage';
import { URLs } from './urls';

export class LoginPage extends BasePage {
  protected readonly url = URLs.login;

  readonly form: Locator;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.form = page.getByTestId('login-form');
    this.subtitle = page.getByTestId('login-subtitle');
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = page.getByTestId('login-submit-btn');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
