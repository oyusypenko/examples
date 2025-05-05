import { runInAction, makeObservable, computed } from "mobx";
import booksStore from "../stores/BooksStore";
import booksRepository from "../repositories/BooksRepository";
import bookFormController from "./BookFormController";

class BooksController {
  constructor() {
    this.booksStore = booksStore;
    this.booksRepository = booksRepository;
    this.bookFormController = bookFormController;

    makeObservable(this, {
      books: computed,
      isLoading: computed,
      error: computed,
      showBookForm: computed,
      viewMode: computed,
      privateBookCount: computed
    });

    this.initLoadBooks();
  }

  get books() {
    return this.booksStore.books;
  }

  get isLoading() {
    return this.booksStore.isLoading;
  }

  get error() {
    return this.booksStore.error;
  }

  get showBookForm() {
    return this.booksStore.showBookForm;
  }

  get viewMode() {
    return this.booksStore.viewMode;
  }

  get privateBookCount() {
    return this.booksStore.privateBookCount;
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
        this.booksStore.setLoading(true);
      });

      const books = await this.booksRepository.getBooks();

      runInAction(() => {
        this.booksStore.setBooks(books);
        this.booksStore.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.booksStore.setError(error.message);
        this.booksStore.setLoading(false);
      });
    }
  };

  loadPrivateBooks = async () => {
    try {
      runInAction(() => {
        this.booksStore.setLoading(true);
      })

      const privateBooks = await this.booksRepository.getPrivateBooks();
      if (privateBooks?.length > 0) {
        const privateBookCount = privateBooks.length;


        runInAction(() => {
          this.booksStore.setPrivateBookCount(privateBookCount);
        });
      }
      runInAction(() => {
        this.booksStore.setBooks(privateBooks);
        this.booksStore.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.booksStore.setError(error.message);
        this.booksStore.setLoading(false);
      });
    }
  };

  countPrivateBooks = async () => {
    const privateBooks = await this.booksRepository.getPrivateBooks();
    if (privateBooks?.length > 0) {
      const privateBookCount = privateBooks.length;
      runInAction(() => {
        this.booksStore.setPrivateBookCount(privateBookCount);
      });
    }
  };

  toggleViewMode = () => {
    this.booksStore.setViewMode(this.booksStore.viewMode === 'all' ? 'private' : 'all');
    if (this.booksStore.viewMode === 'private') {
      this.loadPrivateBooks();
    } else {
      this.loadBooks();
    }
  };
}

export default new BooksController();