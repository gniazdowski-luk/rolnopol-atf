import { type Locator, type Page } from '@playwright/test';

import { BasePage } from './BasePage';
import { URLs } from './urls';

export class DocsPage extends BasePage {
  protected readonly url = URLs.docs;

  readonly sidebarTitle: Locator;
  readonly nav: Locator;
  readonly content: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarTitle = page.getByTestId('docs-sidebar-title');
    this.nav = page.getByTestId('docs-nav');
    this.content = page.getByTestId('docs-content');
  }
}
