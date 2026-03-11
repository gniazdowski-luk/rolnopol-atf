import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { URLs } from "./urls";

export class SwaggerPage extends BasePage {
  protected readonly url = URLs.swagger;

  readonly swaggerFrame: Locator;
  readonly swaggerTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.swaggerFrame = page.locator("#swagger-frame");
    this.swaggerTitle = page.frameLocator("#swagger-frame").locator("h2.title");
  }
}
