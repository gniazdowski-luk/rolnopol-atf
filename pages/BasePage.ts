import { type Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  protected abstract readonly url: string;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
}
