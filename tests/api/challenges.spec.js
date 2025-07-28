import { expect } from "@playwright/test";
import { test } from "../../src/helpers/fixtures/index";
import { TodoBuilder } from "../../src/helpers/builders/index";
import { NoteBuilder } from "../../src/helpers/builders/index";

let token;
test.describe("Challenge", () => {
  test.beforeAll(async ({ ApiService }) => {
    const response = await ApiService.challenger.post();
    const headers = await response.headers();
    token = headers["x-challenger"];
    console.log(`/gui/challenges/${token}`);
  });
  test(
    "Проверка, что ответе возвращается 10 задач",
    {
      tag: "@get",
    },
    async ({ ApiService }) => {
      const response = await ApiService.todos.get(token);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.todos.length).toBe(10);
    }
  );

  test(
    "Проверка запроса к некорректному эндпоинту",
    {
      tag: "@get",
    },
    async ({ ApiService }) => {
      const response = await ApiService.todos.getWrong(token);
      expect(response.status()).toBe(404);
    }
  );

  test(
    "Проверка получения задачи по id",
    {
      tag: "@get",
    },
    async ({ ApiService }) => {
      const id = 8;
      const response = await ApiService.todos.getById(token, id);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.todos[0]).toHaveProperty("id", id);
    }
  );

  test(
    "Проверка требуемых атрибутов задачи в теле ответа",
    {
      tag: "@get",
    },
    async ({ ApiService }) => {
      const response = await ApiService.todos.get(token);
      const body = await response.json();
      expect(body.todos[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          doneStatus: expect.any(Boolean),
          description: expect.any(String),
        })
      );
    }
  );

  test(
    "Проверка получения несуществующей задачи по id",
    {
      tag: "@get",
    },
    async ({ ApiService }) => {
      const id = 21;
      const response = await ApiService.todos.getById(token, id);
      expect(response.status()).toBe(404);
    }
  );

  test(
    "Проверка фильтрации по id через query-параметры",
    {
      tag: "@get",
    },
    async ({ ApiService }) => {
      const filter = "id";
      const param = 3;
      const response = await ApiService.todos.getWithQuery(token, filter, param);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.todos[0]).toHaveProperty("id", param);
    }
  );

  test(
    "Проверка фильтрации по статусу выполнения задачи через query-параметры",
    {
      tag: "@get",
    },
    async ({ ApiService }) => {
      const filter = "doneStatus";
      const param = false;
      const response = await ApiService.todos.getWithQuery(token, filter, param);
      expect(response.status()).toBe(200);
      const body = await response.json();

      body.todos.forEach((todo) => {
        expect(todo).toHaveProperty("doneStatus", param);
      });
    }
  );

  test(
    "Проверка создания задачи",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const newTodo = new TodoBuilder()
        .addTitle(10)
        .addDoneStatus()
        .addDescription(50)
        .generate();

      const response = await ApiService.todos.postTodos(token, newTodo);

      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body).toMatchObject({
        title: newTodo.title,
        description: newTodo.description,
        doneStatus: newTodo.doneStatus,
      });
      expect(body).toHaveProperty("id");
    }
  );

  test(
    "Проверка создания задачи с максимально допустимыми title и description",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const newTodo = new TodoBuilder()
        .addTitle(50)
        .addDoneStatus()
        .addDescription(200)
        .generate();

      const response = await ApiService.todos.postTodos(token, newTodo);

      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body).toMatchObject({
        title: newTodo.title,
        description: newTodo.description,
        doneStatus: newTodo.doneStatus,
      });
      expect(body).toHaveProperty("id");
    }
  );

  test(
    "Проверка создания задачи с невалидным doneStatus",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const invalidTodo = new TodoBuilder()
        .addTitle(10)
        .addDescription(50)
        .generate();
      invalidTodo.doneStatus = "true";

      const response = await ApiService.todos.postTodos(token, invalidTodo);
      expect(response.status()).toBe(400);
    }
  );

  test(
    "Проверка создания задачи с невалидным по длине title",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const invalidTodo = new TodoBuilder()
        .addTitle(51)
        .addDoneStatus()
        .addDescription(199)
        .generate();

      const response = await ApiService.todos.postTodos(token, invalidTodo);
      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.errorMessages).toContain(
        "Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50"
      );
    }
  );

  test(
    "Проверка создания задачи с невалидным по длине description",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const invalidTodo = new TodoBuilder()
        .addTitle(50)
        .addDoneStatus()
        .addDescription(201)
        .generate();

      const response = await ApiService.todos.postTodos(token, invalidTodo);
      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.errorMessages).toContain(
        "Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200"
      );
    }
  );

  test(
    "Проверка создания задачи с несуществующим атрибутом",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const invalidTodo = new TodoBuilder()
        .addTitle(10)
        .addDoneStatus()
        .addDescription(50)
        .generate();
      invalidTodo.priority = "high";

      const response = await ApiService.todos.postTodos(token, invalidTodo);
      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.errorMessages).toContain("Could not find field: priority");
    }
  );

  test(
    "Проверка создания задачи с телом, превышающим 5000 символов",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const invalidTodo = new TodoBuilder()
        .addTitle(10)
        .addDoneStatus()
        .addLongDescription(5000)
        .generate();

      const response = await ApiService.todos.postTodos(token, invalidTodo);
      expect(response.status()).toBe(413);
      const body = await response.json();
      expect(body.errorMessages).toContain(
        "Error: Request body too large, max allowed is 5000 bytes"
      );
    }
  );

  test(
    "Проверка создания задачи без атрибута title",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const invalidTodo = new TodoBuilder()
        .addDoneStatus()
        .addDescription(50)
        .generate();

      const response = await ApiService.todos.postTodos(token, invalidTodo);
      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.errorMessages).toContain("title : field is mandatory");
    }
  );

  test(
    "Проверка создания задачи методом PUT",
    {
      tag: "@put",
    },
    async ({ ApiService }) => {
      const id = 21;
      const newTodo = new TodoBuilder()
        .addTitle(10)
        .addDoneStatus()
        .addDescription(50)
        .generate();

      const response = await ApiService.todos.put(token, id, newTodo);

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.errorMessages).toContain(
        "Cannot create todo with PUT due to Auto fields id"
      );
    }
  );

  test(
    "Проверка полного обновления задачи",
    {
      tag: "@put",
    },
    async ({ ApiService }) => {
      const id = 3;
      const newTodo = new TodoBuilder()
        .addId(id)
        .addTitle(10)
        .addDoneStatus()
        .addDescription(50)
        .generate();

      const response = await ApiService.todos.put(token, id, newTodo);

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toMatchObject(newTodo);
    }
  );

  test(
    "Проверка частичного обновления атрибута title в задаче",
    {
      tag: "@put",
    },
    async ({ ApiService }) => {
      const id = 5;
      const newTodo = new TodoBuilder().addTitle(10).generate();

      const response = await ApiService.todos.put(token, id, newTodo);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.title).toBe(newTodo.title);
    }
  );

  test(
    "Проверка обновления задачи с несовпадающими id",
    {
      tag: "@put",
    },
    async ({ ApiService }) => {
      const idUrl = 7;
      const idBody = 4;
      const newTodo = new TodoBuilder().addId(idBody).addTitle(10).generate();

      const response = await ApiService.todos.put(token, idUrl, newTodo);
      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.errorMessages).toContain(
        `Can not amend id from ${idUrl} to ${idBody}`
      );
    }
  );

  test(
    "Проверка обновления задачи без обязательного атрибута title",
    {
      tag: "@put",
    },
    async ({ ApiService }) => {
      const id = 9;
      const newTodo = new TodoBuilder().addDescription(80).generate();

      const response = await ApiService.todos.put(token, id, newTodo);
      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.errorMessages).toContain("title : field is mandatory");
    }
  );

  test(
    "Проверка удаления задачи по id",
    {
      tag: "@delete",
    },
    async ({ ApiService }) => {
      const id = 2;
      const response = await ApiService.todos.deleteById(token, id);
      expect(response.status()).toBe(200);
    }
  );
  test(
    "Проверка удаления задачи без указания id",
    {
      tag: "@delete",
    },
    async ({ ApiService }) => {
      const response = await ApiService.todos.deleteWrong(token);
      expect(response.status()).toBe(405);
    }
  );

  test(
    "Проверка удаления несуществующей задачи по id",
    {
      tag: "@delete",
    },
    async ({ ApiService }) => {
      const id = 123;
      const response = await ApiService.todos.deleteById(token, id);
      expect(response.status()).toBe(404);
      const body = await response.json();
      expect(body.errorMessages).toContain(
        `Could not find any instances with todos/${id}`
      );
    }
  );

  test(
    "Проверка обращения к несуществующему эндпоинту DELETE /heartbeat",
    {
      tag: "@delete",
    },
    async ({ ApiService }) => {
      const response = await ApiService.heartbeat.deleteHeartbeat(token);
      expect(response.status()).toBe(405);
    }
  );

  test(
    "Проверка обращения к эндпоинту PATCH /heartbeat",
    {
      tag: "@patch",
    },
    async ({ ApiService }) => {
      const response = await ApiService.heartbeat.patch(token);
      expect(response.status()).toBe(500);
    }
  );

  test(
    "Проверка аутентификации с валидным логином/паролем",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const auth = "Basic YWRtaW46cGFzc3dvcmQ=";
      const response = await ApiService.secret.postAuth(token, auth);
      expect(response.status()).toBe(201);
      const headers = await response.headers();
      expect(headers).toHaveProperty("x-auth-token");
    }
  );

  test(
    "Проверка аутентификации с невалидным логином/паролем",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const auth = "Basic YWRtaW46cGFzc3dvcmRk";
      const response = await ApiService.secret.postAuth(token, auth);
      expect(response.status()).toBe(401);
      const headers = await response.headers();
      expect(headers).not.toHaveProperty("x-auth-token");
    }
  );

  test(
    "Проверка создания заметки",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const newNote = new NoteBuilder().addNote(30).generate();
      const auth = "Basic YWRtaW46cGFzc3dvcmQ=";
      const resAuth = await ApiService.secret.postAuth(token, auth);
      const headers = await resAuth.headers();
      const authToken = headers["x-auth-token"];

      const response = await ApiService.secret.postSecretNote(token, authToken, newNote);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toMatchObject(newNote);
    }
  );

  test(
    "Проверка создания заметки без токена авторизации",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const newNote = new NoteBuilder().addNote(30).generate();

      const response = await ApiService.secret.postSecretNoteWrong(token, newNote);
      expect(response.status()).toBe(401);
    }
  );

  test(
    "Проверка создания заметки с невалидным токеном авторизации",
    {
      tag: "@post",
    },
    async ({ ApiService }) => {
      const newNote = new NoteBuilder().addNote(30).generate();
      const authToken = "674d847e-1211-4c1b-be12-3b32b8de9a1a";
      const response = await ApiService.secret.postSecretNote(token, authToken, newNote);
      expect(response.status()).toBe(403);
    }
  );
});