import { faker } from "@faker-js/faker";

export class NoteBuilder {
  
  addNote(symbol) {
    this.note = faker.lorem.words(20).slice(0, symbol);
    return this;
  }

  generate() {
    return {
      note: this.note,
    };
  }
}