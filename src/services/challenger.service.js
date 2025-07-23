import { test } from "@playwright/test";

export class ChallengerService {
  constructor(request) {
    this.request = request;
    this.url = process.env.API_BASE_URL;
  }
  async post() {
    return test.step("post /challenger", async () => {
      const response = await this.request.post(`${this.url}challenger`);
      return response;
    });
  }
}
