import { test } from "@playwright/test";
const URL = "https://apichallenges.herokuapp.com/";

export class PostService {
  constructor(request) {
    this.request = request;
  }
  async postTodos(token, newTodo) {
    return test.step("post /todos", async () => {
      //const { title, doneStatus, description } = newTodo;
      const response = await this.request.post(`${URL}todos`, {
        headers: {
          "x-challenger": token,
          "Content-Type": "application/json",
        },
        data: newTodo,
      });
      return response;
    });
  }
  async postAuth(token, auth) {
    return test.step("post /secret/token", async () => {
      const response = await this.request.post(`${URL}secret/token`, {
        headers: {
          "x-challenger": token,
          Authorization: auth,
        },
      });
      return response;
    });
  }
  async postSecretNote(token, authToken, newNote) {
    return test.step("post /secret/note", async () => {
      const response = await this.request.post(`${URL}secret/note`, {
        headers: {
          "x-challenger": token,
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        data: newNote,
      });
      return response;
    });
  }
  async postSecretNoteWrong(token, newNote) {
    return test.step("post /secret/note", async () => {
      const response = await this.request.post(`${URL}secret/note`, {
        headers: {
          "x-challenger": token,
          "Content-Type": "application/json",
        },
        data: newNote,
      });
      return response;
    });
  }
}