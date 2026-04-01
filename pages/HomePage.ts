import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { URLs } from "./urls";

export class HomePage extends BasePage {
  protected readonly url = URLs.home;

  readonly footer: Locator;
  readonly footerNav: Locator;
  readonly footerContactLink: Locator;
  readonly footerJaktestowacLink: Locator;
  readonly footerAiTestersLink: Locator;

  constructor(page: Page) {
    super(page);
    this.footer = page.getByRole("contentinfo");
    this.footerNav = page.getByRole("navigation", {
      name: "Footer navigation",
    });
    this.footerContactLink = this.footerNav.getByRole("link", {
      name: "Contact us",
    });
    this.footerJaktestowacLink = this.footer.getByRole("link", {
      name: "jaktestowac.pl",
      exact: true,
    });
    this.footerAiTestersLink = this.footer.getByRole("link", {
      name: "AI_Testers",
      exact: true,
    });
  }
}
