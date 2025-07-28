import { test } from "@playwright/test";

export class ChallengerService {
  constructor(request) {
    this.request = request;
  }
  async post() {
    return test.step("post /challenger", async () => {
      const response = await this.request.post('/challenger');
      return response;
    });
  }
}
