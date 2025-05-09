import { runInAction } from "mobx";
import booksStore from "../stores/BooksStore";
import booksRepository from "../repositories/BooksRepository";
import bookFormController from "./BookFormController";

export class BooksController {
  constructor(
    booksStoreParam = booksStore,
    booksRepositoryParam = booksRepository,
    bookFormControllerParam = bookFormController,
    initializeOnCreate = true
  ) {
    this.booksStore = booksStoreParam;
    this.booksRepository = booksRepositoryParam;
    this.bookFormController = bookFormControllerParam;

    if (initializeOnCreate) {
      this.initLoadBooks();
    }
  }

  initLoadBooks = async () => {
    if (this.booksStore.viewMode === 'all') {
      this.loadBooks();
    } else {
      this.loadPrivateBooks();
    }
  }

  loadBooks = async () => {
    try {
      runInAction(() => {
        this.booksStore.isLoading = true;
      });

      const books = await this.booksRepository.getBooks();

      runInAction(() => {
        this.booksStore.books = books;
        this.booksStore.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.booksStore.error = error.message;
        this.booksStore.isLoading = false;
      });
    }
  };

  loadPrivateBooks = async () => {
    try {
      runInAction(() => {
        this.booksStore.isLoading = true;
      })

      const privateBooks = await this.booksRepository.getPrivateBooks();

      runInAction(() => {
        this.booksStore.books = privateBooks;
        this.booksStore.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.booksStore.error = error.message;
        this.booksStore.isLoading = false;
      });
    }
  };

  toggleViewMode = () => {
    runInAction(() => {
      this.booksStore.viewMode = this.booksStore.viewMode === 'all' ? 'private' : 'all';
    });

    if (this.booksStore.viewMode === 'private') {
      this.loadPrivateBooks();
    } else {
      this.loadBooks();
    }
  };
}

export default new BooksController();