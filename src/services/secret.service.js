import { test } from "@playwright/test";

export class SecretService {
  constructor(request) {
    this.request = request;
    this.url = process.env.API_BASE_URL;
  }
  async postAuth(token, auth) {
    return test.step("post /secret/token", async () => {
      const response = await this.request.post('/secret/token', {
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
      const response = await this.request.post('/secret/note', {
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
      const response = await this.request.post('/secret/note', {
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
