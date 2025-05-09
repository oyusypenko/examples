import booksStore from '../BooksStore';
import { runInAction } from 'mobx';

describe('BooksStore', () => {
  beforeEach(() => {
    runInAction(() => {
      booksStore.books = [];
      booksStore.isLoading = false;
      booksStore.error = null;
      booksStore.submissionError = null;
      booksStore.isSubmitting = false;
      booksStore.showBookForm = false;
      booksStore.viewMode = 'all';
    });
  });

  it('reactively updates computed values when observables change', () => {
    const mixedBooks = [
      { id: '1', name: 'Public Book', author: 'Author 1', isPrivate: false },
      { id: '2', name: 'Private Book 1', author: 'Author 2', isPrivate: true }
    ];

    runInAction(() => {
      booksStore.books = mixedBooks;
    });

    expect(booksStore.privateBookCount).toBe(1);

    runInAction(() => {
      booksStore.books.push({ id: '3', name: 'Private Book 2', author: 'Author 3', isPrivate: true });
    });

    expect(booksStore.privateBookCount).toBe(2);

    runInAction(() => {
      booksStore.books[1].isPrivate = false;
    });

    expect(booksStore.privateBookCount).toBe(1);
  });
});