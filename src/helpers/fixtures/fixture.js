import { test as base } from "@playwright/test";
import { App } from "../../pages/app.page";
import { Api } from "../../services/api.service";

export const test = base.extend({
  webApp: async ({ page }, use) => {
    let app = new App(page);
    await app.main.open();
    await use(app);
  },

  ApiService: async ({ request }, use) => {
      const api = new Api(request);
      await use(api);
    },
});
