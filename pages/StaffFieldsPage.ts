import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { URLs } from "./urls";

export class StaffFieldsPage extends BasePage {
  readonly url = URLs.staffFieldsMain;

  readonly addFieldButton: Locator;
  readonly fieldNameInput: Locator;
  readonly fieldAreaInput: Locator;
  readonly addFieldSubmitButton: Locator;
  readonly fieldMessage: Locator;
  readonly fieldsSearch: Locator;

  readonly addHerdButton: Locator;
  readonly herdNameInput: Locator;
  readonly herdAnimalTypeInput: Locator;
  readonly addHerdSubmitButton: Locator;
  readonly herdMessage: Locator;
  readonly herdsSearch: Locator;

  constructor(page: Page) {
    super(page);
    this.addFieldButton = page.locator("#openAddFieldModal");
    this.fieldNameInput = page.locator("#fieldName");
    this.fieldAreaInput = page.locator("#fieldArea");
    this.addFieldSubmitButton = page
      .locator("#addFieldForm")
      .getByRole("button", { name: /Add Field/i });
    this.fieldMessage = page.locator("#fieldMessage.message-modern");
    this.fieldsSearch = page.locator("#fieldsSearch");

    this.addHerdButton = page.locator("#openAddHerdModal");
    this.herdNameInput = page.locator("#herdName");
    this.herdAnimalTypeInput = page.locator("#herdAnimalType");
    this.addHerdSubmitButton = page
      .locator("#addHerdForm")
      .getByRole("button", { name: /Add Herd/i });
    this.herdMessage = page.locator("#herdMessage.message-modern");
    this.herdsSearch = page.locator("#herdsSearch");
  }

  async openAddFieldModal(): Promise<void> {
    await this.addFieldButton.click();
  }

  async addField(name: string, area: number): Promise<void> {
    await this.fieldNameInput.fill(name);
    await this.fieldAreaInput.fill(String(area));
    await this.addFieldSubmitButton.click();
  }

  async openAddHerdModal(): Promise<void> {
    await this.addHerdButton.click();
  }

  async addHerd(name: string, animalType: string): Promise<void> {
    await this.herdNameInput.fill(name);
    await this.herdAnimalTypeInput.fill(animalType);
    await this.addHerdSubmitButton.click();
  }
}
