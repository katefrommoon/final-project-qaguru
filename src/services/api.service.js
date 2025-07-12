import {
  ChallengerService,
  GetTodosService,
  PostService,
  PutTodosService,
  DeleteTodosService,
  PatchService,
} from "./index";

export class Api {
  constructor(request) {
    this.request = request;
    this.challenger = new ChallengerService(request);
    this.getTodos = new GetTodosService(request);
    this.post = new PostService(request);
    this.putTodos = new PutTodosService(request);
    this.deleteTodos = new DeleteTodosService(request);
    this.patch = new PatchService(request);
  }
}