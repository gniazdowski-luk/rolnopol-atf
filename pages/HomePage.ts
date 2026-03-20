import { type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { URLs } from "./urls";

export class HomePage extends BasePage {
  readonly url = URLs.home;

  constructor(page: Page) {
    super(page);
  }
}
