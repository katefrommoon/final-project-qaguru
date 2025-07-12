import { test } from "@playwright/test";
const URL = "https://apichallenges.herokuapp.com/";

export class DeleteTodosService {
  constructor(request) {
    this.request = request;
  }
  async deleteById(token, id) {
    return test.step("delete /todos/{id}", async () => {
      const response = await this.request.delete(`${URL}todos/${id}`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  };
  async deleteWrong(token) {
    return test.step("delete /todos", async () => {
      const response = await this.request.delete(`${URL}todos`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  };
  async deleteHeartbeat(token) {
    return test.step("delete /heartbeat", async () => {
      const response = await this.request.delete(`${URL}heartbeat`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  };
}