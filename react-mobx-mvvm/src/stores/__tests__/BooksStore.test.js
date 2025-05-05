import booksStore from '../BooksStore';

describe('BooksStore', () => {
  beforeEach(() => {
    booksStore.books = [];
    booksStore.isLoading = false;
    booksStore.error = null;
    booksStore.submissionError = null;
    booksStore.isSubmitting = false;
    booksStore.showBookForm = false;
    booksStore.privateBookCount = 0;
    booksStore.viewMode = 'all';
  });

  it('stores books correctly', () => {
    const books = [{ id: '1', name: 'Book', author: 'Author' }];
    booksStore.setBooks(books);
    expect(booksStore.books).toEqual(books);
  });

  it('handles loading state', () => {
    expect(booksStore.isLoading).toBe(false);

    booksStore.setLoading(true);
    expect(booksStore.isLoading).toBe(true);

    booksStore.setLoading(false);
    expect(booksStore.isLoading).toBe(false);
  });

  it('sets and clears error messages', () => {
    booksStore.setError('Error message');
    expect(booksStore.error).toBe('Error message');

    booksStore.setError(null);
    expect(booksStore.error).toBeNull();
  });

  it('handles submission state', () => {
    booksStore.setSubmitting(true);
    expect(booksStore.isSubmitting).toBe(true);

    booksStore.setSubmitting(false);
    expect(booksStore.isSubmitting).toBe(false);
  });

  it('sets and clears submission errors', () => {
    booksStore.setSubmissionError('Submission failed');
    expect(booksStore.submissionError).toBe('Submission failed');

    booksStore.setSubmissionError(null);
    expect(booksStore.submissionError).toBeNull();
  });

  it('toggles book form visibility', () => {
    expect(booksStore.showBookForm).toBe(false);

    booksStore.toggleShowBookForm();
    expect(booksStore.showBookForm).toBe(true);

    booksStore.toggleShowBookForm();
    expect(booksStore.showBookForm).toBe(false);
  });

  it('sets view mode', () => {
    booksStore.setViewMode('all');
    expect(booksStore.viewMode).toBe('all');

    booksStore.setViewMode('private');
    expect(booksStore.viewMode).toBe('private');
  });

  it('sets private book count', () => {
    expect(booksStore.privateBookCount).toBe(0);

    booksStore.setPrivateBookCount(5);
    expect(booksStore.privateBookCount).toBe(5);

    booksStore.setPrivateBookCount(0);
    expect(booksStore.privateBookCount).toBe(0);
  });
});