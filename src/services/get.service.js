import { test } from "@playwright/test";
const URL = "https://apichallenges.herokuapp.com/";

export class GetTodosService {
  constructor(request) {
    this.request = request;
  }
  async get(token) {
    return test.step("get /todos", async () => {
      const response = await this.request.get(`${URL}todos`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  };

  async getWrong(token) {
    return test.step("get /todo", async () => {
      const response = await this.request.get(`${URL}todo`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  };

  async getById(token, id) {
    return test.step("get /todos/{id}", async () => {
      const response = await this.request.get(`${URL}todos/${id}`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  };

  async getWithQuery(token, filter, param) {
    return test.step("get /todos?filter", async () => {
      const response = await this.request.get(`${URL}todos?${filter}=${param}`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  };
}