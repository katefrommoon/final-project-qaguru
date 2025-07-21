import { expect } from "@playwright/test";
import { CommentBuilder } from "../../src/helpers/builders/comment.builder";
import { test } from "../../src/helpers/fixtures/index";
import {productIds} from "../../src/constants/constants"

test("Баг с размером изображения в карточке товара", async ({ webApp }) => {
  await webApp.main.clickCard(productIds.wrongSizeCard);
  await webApp.bugModal.chooseType("Visual");
  await webApp.bugModal.chooseResult("The product image fills the");
  await webApp.bugModal.clickSubmit();
  await webApp.bugModal.clickViewReport();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(webApp.bugModal.title).toBeVisible();
  });
});

test("Баг с изменением количества товаров на странице", async ({ webApp }) => {
  await webApp.main.clickSize();
  await webApp.bugModal.chooseType("Crash");
  await webApp.bugModal.chooseResult("The selected number of");
  await webApp.bugModal.clickSubmit();
  await webApp.bugModal.clickViewReport();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(webApp.bugModal.title).toBeVisible();
  });
});

test("Баг с отправкой комментария в карточке товара", async ({ webApp }) => {
  const randomComment = new CommentBuilder()
    .addComment()
    .addName()
    .addEmail()
    .generate();

  await webApp.main.clickCard(productIds.commentCard);
  await webApp.productPage.createComment(randomComment);
  await webApp.bugModal.chooseType("Crash");
  await webApp.bugModal.chooseResult("The comment is posted under");
  await webApp.bugModal.clickSubmit();
  await webApp.bugModal.clickViewReport();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(webApp.bugModal.title).toBeVisible();
  });
});

test("Баг с некорректным описанием товара", async ({ webApp }) => {
  await webApp.main.clickCard(productIds.badDescriptionCard);
  await webApp.productPage.clickDescription();
  await webApp.bugModal.chooseType("Content");
  await webApp.bugModal.chooseResult("The text should be in English");
  await webApp.bugModal.clickSubmit();
  await webApp.bugModal.clickViewReport();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(webApp.bugModal.title).toBeVisible();
  });
});

test.skip("Баг с увеличением количества товара определенного цвета", async ({
  webApp,
}) => {
  await webApp.main.clickCard(productIds.increaseQuantityCard);
  await webApp.productPage.chooseColor();
  await webApp.productPage.increaseQuantity();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(webApp.bugModal.title).toBeVisible();
  });
});

test("Баг с фильтрацией по цене", async ({ webApp }) => {
  await webApp.main.clickCard(productIds.priceFilterCard);
  await webApp.productPage.filterByPrice();
  await webApp.bugModal.chooseType("Functional");
  await webApp.bugModal.chooseResult("A list of products in the");
  await webApp.bugModal.clickSubmit();
  await webApp.bugModal.clickViewReport();

  return test.step('Появление модалки "#1 Awesome! You found a bug."', async () => {
    await expect(webApp.bugModal.title).toBeVisible();
  });
});
