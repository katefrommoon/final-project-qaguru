import { faker } from "@faker-js/faker";

export class TodoBuilder {
  
  addId(id = 3) {
    this.id = id;
    return this;
  }
  addTitle(symbol) {
    this.title = faker.lorem.words(20).slice(0, symbol);
    return this;
  }
  addDoneStatus(value = false) {
    this.doneStatus = value;
    return this;
  }
  addDescription(symbol) {
    this.description = faker.lorem.paragraph(20).slice(0, symbol);
    return this;
  }
  addLongDescription(length) {
    this.description = "A".repeat(length);
    return this;
  }

  generate() {
    return {
      id: this.id,
      title: this.title,
      doneStatus: this.doneStatus,
      description: this.description,
    };
  }
}
