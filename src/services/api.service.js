import {
  ChallengerService,
  SecretService,
  HeartbeatService,
  TodosService,
} from "./index";

export class Api {
  constructor(request) {
    this.request = request;
    this.challenger = new ChallengerService(request);
    this.secret = new SecretService(request);
    this.heartbeat = new HeartbeatService(request);
    this.todos = new TodosService(request);
  }
}
