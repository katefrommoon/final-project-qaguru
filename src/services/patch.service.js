import { test } from "@playwright/test";
const URL = "https://apichallenges.herokuapp.com/";

export class PatchService {
  constructor(request) {
    this.request = request;
  }
  async patch(token, id, newTodo) {
    return test.step("patch /heartbeat", async () => {
      const response = await this.request.patch(`${URL}heartbeat`, {
        headers: {
          "x-challenger": token
        },
      });
      return response;
    });
  }
}