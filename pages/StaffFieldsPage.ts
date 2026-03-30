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

  readonly addAnimalButton: Locator;
  readonly animalTypeSelect: Locator;
  readonly animalAmountInput: Locator;
  readonly addAnimalSubmitButton: Locator;
  readonly addAnimalModal: Locator;
  readonly animalsSearch: Locator;
  readonly animalsList: Locator;

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

    this.addAnimalButton = page.locator("#openAddAnimalModal");
    this.animalTypeSelect = page.locator("#animalType");
    this.animalAmountInput = page.locator("#animalAmount");
    this.addAnimalSubmitButton = page
      .locator("#addAnimalForm")
      .getByRole("button", { name: /Add Animal/i });
    this.addAnimalModal = page.locator("#addAnimalModal");
    this.animalsSearch = page.locator("#animalsSearch");
    this.animalsList = page.locator("#animalsList");
  }

  async openAddFieldModal(): Promise<void> {
    await this.addFieldButton.click();
  }

  async addField(name: string, area: number): Promise<void> {
    await this.fieldNameInput.fill(name);
    await this.fieldAreaInput.fill(String(area));
    await this.addFieldSubmitButton.click();
  }

  async openAddAnimalModal(): Promise<void> {
    await this.addAnimalButton.click();
  }

  async addAnimal(type: string, amount: number): Promise<void> {
    await this.page.waitForSelector(`#animalType option[value="${type}"]`, {
      state: "attached",
    });
    await this.animalTypeSelect.selectOption(type);
    await this.animalAmountInput.fill(String(amount));
    await this.addAnimalSubmitButton.click();
    await this.addAnimalModal.waitFor({ state: "hidden" });
  }
}
