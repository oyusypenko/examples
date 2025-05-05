import { makeObservable, observable, action } from 'mobx';

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
      setBooks: action,
      setLoading: action,
      setError: action,
      setSubmitting: action,
      setSubmissionError: action,
      toggleShowBookForm: action,
      setViewMode: action,
      privateBookCount: observable,
      setPrivateBookCount: action,
    });
  }

  setBooks = (books) => {
    this.books = books;
  };

  setLoading = (loading) => {
    this.isLoading = loading;
  };

  setError = (error) => {
    this.error = error;
  };

  setSubmitting = (submitting) => {
    this.isSubmitting = submitting;
  };

  setSubmissionError = (error) => {
    this.submissionError = error;
  };

  toggleShowBookForm = () => {
    this.showBookForm = !this.showBookForm;
  };

  setViewMode = (viewMode) => {
    this.viewMode = viewMode;
  };

  setPrivateBookCount = (count) => {
    this.privateBookCount = count;
  };
}

const booksStore = new BooksStore();
export default booksStore;