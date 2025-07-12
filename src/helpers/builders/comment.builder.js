import { faker } from "@faker-js/faker";
export class CommentBuilder {
  addComment() {
    this.comment = faker.lorem.sentence({ min: 2, max: 6 });
    return this;
  }
  addName() {
    this.name = faker.internet.username();
    return this;
  }
  addEmail() {
    this.email = faker.internet.email();
    return this;
  }
  generate() {
    return {
      comment: this.comment,
      name: this.name,
      email: this.email,
    };
  }
}