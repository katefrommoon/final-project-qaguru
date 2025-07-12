import { test, expect } from "@playwright/test";
import { App } from "../../src/pages/app.page";
import { CommentBuilder } from "../../src/helpers/builders/comment.builder";

test("Баг с размером изображения в карточке товара", async ({ page }) => {
  let app = new App(page);
  await app.main.open();
  await app.main.clickCard("4281370");
  await app.bugModal.chooseType("Visual");
  await app.bugModal.chooseResult("The product image fills the");
  await app.bugModal.clickSubmit();
  await app.bugModal.clickViewReport();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(app.bugModal.title).toBeVisible();
  });
});

test("Баг с изменением количества товаров на странице", async ({ page }) => {
  let app = new App(page);
  await app.main.open();
  await app.main.clickSize();
  await app.bugModal.chooseType("Crash");
  await app.bugModal.chooseResult("The selected number of");
  await app.bugModal.clickSubmit();
  await app.bugModal.clickViewReport();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(app.bugModal.title).toBeVisible();
  });
});

test("Баг с отправкой комментария в карточке товара", async ({ page }) => {
  let app = new App(page);
  const randomComment = new CommentBuilder()
    .addComment()
    .addName()
    .addEmail()
    .generate();

  await app.main.open();
  await app.main.clickCard("4481370");
  await app.productPage.createComment(randomComment);
  await app.bugModal.chooseType("Crash");
  await app.bugModal.chooseResult("The comment is posted under");
  await app.bugModal.clickSubmit();
  await app.bugModal.clickViewReport();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(app.bugModal.title).toBeVisible();
  });
});

test("Баг с некорректным описанием товара", async ({ page }) => {
  let app = new App(page);
  await app.main.open();
  await app.main.clickCard("4881370");
  await app.productPage.clickDescription();
  await app.bugModal.chooseType("Content");
  await app.bugModal.chooseResult("The text should be in English");
  await app.bugModal.clickSubmit();
  await app.bugModal.clickViewReport();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(app.bugModal.title).toBeVisible();
  });
});

test.skip("Баг с увеличением количества товара определенного цвета", async ({
  page,
}) => {
  let app = new App(page);
  await app.main.open();
  await app.main.clickCard("3981370");
  await app.productPage.chooseColor();
  await app.productPage.increaseQuantity();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(app.bugModal.title).toBeVisible();
  });
});

test("Баг с фильтрацией по цене", async ({ page }) => {
  let app = new App(page);
  await app.main.open();
  await app.main.clickCard("3181370");
  await app.productPage.filterByPrice();
  await app.bugModal.chooseType("Functional");
  await app.bugModal.chooseResult("A list of products in the");
  await app.bugModal.clickSubmit();
  await app.bugModal.clickViewReport();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(app.bugModal.title).toBeVisible();
  });
});
