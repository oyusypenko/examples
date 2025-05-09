class Book {
  constructor(id, name, author, isPrivate = true) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.isPrivate = isPrivate;
  }
}

export default Book;