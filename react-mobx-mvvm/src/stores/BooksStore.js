import { makeObservable, observable } from 'mobx';

class BooksStore {
  books = [];
  isLoading = false;
  error = null;
  isSubmitting = false;
  submissionError = null;
  showBookForm = false;
  viewMode = 'all';
  privateBookCount = 0;

  constructor() {
    makeObservable(this, {
      books: observable,
      isLoading: observable,
      error: observable,
      isSubmitting: observable,
      submissionError: observable,
      showBookForm: observable,
      viewMode: observable,
      privateBookCount: observable,
    });
  }
}

const booksStore = new BooksStore();
export default booksStore;