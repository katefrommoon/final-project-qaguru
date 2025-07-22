import { test } from "@playwright/test";

export class TodosService {
  constructor(request) {
    this.request = request;
    this.url = process.env.API_BASE_URL;
  }
  async get(token) {
    return test.step("get /todos", async () => {
      const response = await this.request.get(`${this.url}todos`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  }

  async getWrong(token) {
    return test.step("get /todo", async () => {
      const response = await this.request.get(`${this.url}todo`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  }

  async getById(token, id) {
    return test.step("get /todos/{id}", async () => {
      const response = await this.request.get(`${this.url}todos/${id}`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  }

  async getWithQuery(token, filter, param) {
    return test.step("get /todos?filter", async () => {
      const response = await this.request.get(
        `${this.url}todos?${filter}=${param}`,
        {
          headers: {
            "x-challenger": token,
          },
        }
      );
      return response;
    });
  }
  async postTodos(token, newTodo) {
    return test.step("post /todos", async () => {
      const response = await this.request.post(`${this.url}todos`, {
        headers: {
          "x-challenger": token,
          "Content-Type": "application/json",
        },
        data: newTodo,
      });
      return response;
    });
  }

  async put(token, id, newTodo) {
    return test.step("put /todos/{id}", async () => {
      const response = await this.request.put(`${this.url}todos/${id}`, {
        headers: {
          "x-challenger": token,
          "Content-Type": "application/json",
        },
        data: newTodo,
      });
      return response;
    });
  }

  async deleteById(token, id) {
    return test.step("delete /todos/{id}", async () => {
      const response = await this.request.delete(`${this.url}todos/${id}`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  }

  async deleteWrong(token) {
    return test.step("delete /todos", async () => {
      const response = await this.request.delete(`${this.url}todos`, {
        headers: {
          "x-challenger": token,
        },
      });
      return response;
    });
  }
}
