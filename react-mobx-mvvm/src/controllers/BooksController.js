import { runInAction } from "mobx";
import booksStore from "../stores/BooksStore";
import booksRepository from "../repositories/BooksRepository";
import bookFormController from "./BookFormController";

class BooksController {
  constructor() {
    this.booksStore = booksStore;
    this.booksRepository = booksRepository;
    this.bookFormController = bookFormController;
    this.initLoadBooks();
  }

  initLoadBooks = async () => {
    if (this.booksStore.viewMode === 'all') {
      this.loadBooks();
      this.countPrivateBooks();
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
      if (privateBooks?.length > 0) {
        const privateBookCount = privateBooks.length;


        runInAction(() => {
          this.booksStore.privateBookCount = privateBookCount;
        });
      }
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

  countPrivateBooks = async () => {
    const privateBooks = await this.booksRepository.getPrivateBooks();
    if (privateBooks?.length > 0) {
      const privateBookCount = privateBooks.length;
      runInAction(() => {
        this.booksStore.privateBookCount = privateBookCount;
      });
    }
  };

  toggleViewMode = () => {
    this.booksStore.viewMode = this.booksStore.viewMode === 'all' ? 'private' : 'all';
    if (this.booksStore.viewMode === 'private') {
      this.loadPrivateBooks();
    } else {
      this.loadBooks();
    }
  };
}

export default new BooksController();