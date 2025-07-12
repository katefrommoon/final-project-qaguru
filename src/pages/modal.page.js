import { test } from "@playwright/test";

export class ModalPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "#1 Awesome! You found a bug." });
    this.radioType = (text) => page.getByText(text, { exact: true });
    this.radioResult = (text) => page.getByText(text);
    this.buttonSubmit = page.getByRole('button', { name: 'Submit' });
    this.buttonViewReport = page.getByRole('button', { name: 'View Issue Report' });

  }
  async chooseType(text) {
    return test.step(`Выбрать тип бага "${text}"`, async () => {
      await this.radioType(text).click();
    });
  }
  async chooseResult(text) {
    return test.step(`Выбрать ожидаемый результат "${text}"`, async () => {
      await this.radioResult(text).click();
    });
  }
  async clickSubmit() {
    return test.step("Подтвердить выбор", async () => {
      await this.buttonSubmit.click();
    });
  }
  async clickViewReport() {
    return test.step("Перейти к просмотру отчёта", async () => {
      await this.buttonViewReport.click();
    });
  }
}