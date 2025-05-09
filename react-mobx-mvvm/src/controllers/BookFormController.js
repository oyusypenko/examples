import { runInAction } from "mobx";
import { v4 as uuid } from 'uuid';
import booksStore from "../stores/BooksStore";
import booksRepository from "../repositories/BooksRepository";
import Book from "../models/Book";
import booksController from "./BooksController";

export class BookFormController {
  constructor(
    booksStoreParam = booksStore,
    booksRepositoryParam = booksRepository,
    booksControllerParam = booksController
  ) {
    this.booksStore = booksStoreParam;
    this.booksRepository = booksRepositoryParam;
    this.booksController = booksControllerParam;
  }

  toggleVisibility = () => {
    runInAction(() => {
      this.booksStore.showBookForm = !this.booksStore.showBookForm;
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookData = new Book(
      uuid(),
      formData.get('name'),
      formData.get('author')
    )

    this.createBook(bookData);
  };

  createBook = async (bookData) => {
    try {
      runInAction(() => {
        this.booksStore.isSubmitting = true;
        this.booksStore.submissionError = null;
      });

      const result = await this.booksRepository.addBook(bookData);

      if (result) {
        runInAction(() => {
          this.booksStore.isSubmitting = false;
          this.booksStore.showBookForm = false;
          this.booksStore.viewMode = 'private';
        });

        await this.booksController.loadPrivateBooks();
      } else {
        throw new Error("Failed to add book");
      }
    } catch (error) {
      runInAction(() => {
        this.booksStore.submissionError = error.message;
        this.booksStore.isSubmitting = false;
      });
    }
  };
}

export default new BookFormController();