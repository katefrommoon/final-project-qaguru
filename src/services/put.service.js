import { test } from "@playwright/test";
const URL = "https://apichallenges.herokuapp.com/";

export class PutTodosService {
  constructor(request) {
    this.request = request;
  }
  async put(token, id, newTodo) {
    return test.step("put /todos/{id}", async () => {
      const response = await this.request.put(`${URL}todos/${id}`, {
        headers: {
          "x-challenger": token,
          "Content-Type": "application/json",
        },
        data: newTodo,
      });
      return response;
    });
  }
}