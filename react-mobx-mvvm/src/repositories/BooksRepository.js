import ApiGateway from "../services/ApiGateway.js";

class BooksRepository {
  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async () => {
    const booksDto = await this.httpGateway.get("/");
    return booksDto;
  };

  addBook = async ({ name, author }) => {
    const bookAddDto = await this.httpGateway.post("/", { name, author });
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };

  getPrivateBooks = async () => {
    const privateBooks = await this.httpGateway.get("/private");
    return privateBooks;
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;