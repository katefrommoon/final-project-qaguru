import { test } from "@playwright/test";

export class HeartbeatService {
  constructor(request) {
    this.request = request;
    this.url = process.env.API_BASE_URL;
  }
  async patch(token, id, newTodo) {
    return test.step("patch /heartbeat", async () => {
      const response = await this.request.patch('/heartbeat', {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  }
  async deleteHeartbeat(token) {
    return test.step("delete /heartbeat", async () => {
      const response = await this.request.delete('/heartbeat', {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  }
}
