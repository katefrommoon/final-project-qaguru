import { test } from "@playwright/test";

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.commentField = page.getByRole('textbox', { name: 'Comment' });
    this.nameField = page.getByRole('textbox', { name: 'Name*' });
    this.emailField = page.getByRole('textbox', { name: 'Email*' });
    this.postButton = page.getByRole('button', { name: 'Post Comment' });
    this.description = page.locator('.ec_details_description.academy-bug');
    this.colorButton = page.locator('img[title="Green"]');
    this.plusButton = page.getByRole('button', { name: '+' })
    this.priceButton = page.getByRole('link', { name: '$15.00 - $19.99' })
  }
  async createComment(randomComment) {
    return test.step("Написать комментарий", async () => {
      const { comment, name, email } = randomComment
      await this.commentField.click();
      await this.commentField.fill(comment);
      await this.nameField.click();
      await this.nameField.fill(name);
      await this.emailField.click();
      await this.emailField.fill(email);
      await this.postButton.click();
    });
  }
  async clickDescription() {
    return test.step("Кликнуть на описание товара", async () => {
      await this.description.click();
    });
  }
  async chooseColor() {
    return test.step("Выбрать цвет товара", async () => {
      await this.colorButton.click();
    });
  }
  async increaseQuantity() {
    return test.step("Увеличить количество товара", async () => {
      await this.plusButton.click({ force: true });
    });
  }
  async filterByPrice() {
    return test.step("Увеличить количество товара", async () => {
      await this.priceButton.click({ force: true });
    });
  }
}