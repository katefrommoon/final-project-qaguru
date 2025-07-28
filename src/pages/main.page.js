import { test } from "@playwright/test";

export class MainPage {
  constructor(page) {
    this.page = page;
    this.size10 = page.getByRole("link", { name: "10" });
  }
  productCard(id) {
    return this.page
      .locator(`#ec_product_image_effect_${id}`)
      .getByRole("link");
  }
  async open() {
    return test.step("Открыть сайт", async () => {
      await this.page.goto("/find-bugs");
    });
  }

  async clickCard(id) {
    return test.step(`Кликнуть на карточку товара с id = ${id}`, async () => {
      await this.productCard(id).click();
    });
  }
  async clickSize() {
    return test.step("Выбрать количество товаров на странице = 10", async () => {
      await this.size10.click();
    });
  }
}