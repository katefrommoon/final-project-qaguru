import { MainPage, ModalPage, ProductPage } from "./index";

export class App {
  constructor(page) {
    this.page = page;
    this.bugModal = new ModalPage(page);
    this.main = new MainPage(page);
    this.productPage = new ProductPage(page);
  }
}