import { makeObservable, observable, computed } from 'mobx';

class BooksStore {
  books = [];
  isLoading = false;
  error = null;
  isSubmitting = false;
  submissionError = null;
  showBookForm = false;
  viewMode = 'all';

  constructor() {
    makeObservable(this, {
      books: observable,
      isLoading: observable,
      error: observable,
      isSubmitting: observable,
      submissionError: observable,
      showBookForm: observable,
      viewMode: observable,
      privateBookCount: computed
    });
  }

  get privateBookCount() {
    return this.books.filter(book => book.isPrivate).length;
  }
}

const booksStore = new BooksStore();
export default booksStore;