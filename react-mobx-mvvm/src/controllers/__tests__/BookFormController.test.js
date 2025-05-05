import bookFormController from '../BookFormController';
import booksStore from '../../stores/BooksStore';
import booksRepository from '../../repositories/BooksRepository';
import Book from '../../models/Book';

// Mock MobX's makeObservable and computed
jest.mock('mobx', () => ({
  runInAction: jest.fn(fn => fn()),
  makeObservable: jest.fn(),
  computed: jest.fn()
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
}));

jest.mock('../../stores/BooksStore', () => ({
  setSubmitting: jest.fn(),
  setSubmissionError: jest.fn(),
  showBookForm: false,
  toggleShowBookForm: jest.fn(),
  setViewMode: jest.fn(),
  isSubmitting: false,
  submissionError: null
}));

jest.mock('../../repositories/BooksRepository', () => ({
  addBook: jest.fn()
}));

jest.mock('../BooksController', () => ({
  loadBooks: jest.fn(),
  loadPrivateBooks: jest.fn()
}));

global.FormData = jest.fn().mockImplementation(() => ({
  get: jest.fn(key => {
    if (key === 'name') return 'Test Book';
    if (key === 'author') return 'Test Author';
    return null;
  })
}));

describe('BookFormController', () => {
  let mockBook;
  let mockEvent;
  const booksController = require('../BooksController');

  beforeEach(() => {
    jest.clearAllMocks();

    mockBook = new Book('test-uuid', 'Test Book', 'Test Author');
    mockEvent = {
      preventDefault: jest.fn(),
      target: {}
    };
  });

  describe('computed properties', () => {
    test('should return store properties', () => {
      // Mock store values
      Object.defineProperty(booksStore, 'isSubmitting', { get: () => true });
      Object.defineProperty(booksStore, 'submissionError', { get: () => 'Test error' });

      // Test computed properties
      expect(bookFormController.isSubmitting).toBe(true);
      expect(bookFormController.submissionError).toBe('Test error');
    });
  });

  describe('toggleVisibility', () => {
    test('should toggle form visibility', () => {
      bookFormController.toggleVisibility();
      expect(booksStore.toggleShowBookForm).toHaveBeenCalled();
    });
  });

  describe('handleFormSubmit', () => {
    test('should extract form data and call createBook', () => {
      const createBookSpy = jest.spyOn(bookFormController, 'createBook')
        .mockImplementation(() => { });

      bookFormController.handleFormSubmit(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(createBookSpy).toHaveBeenCalledWith(expect.objectContaining({
        id: 'test-uuid',
        name: 'Test Book',
        author: 'Test Author'
      }));
    });
  });

  describe('createBook', () => {
    test('should successfully add a book', async () => {
      booksRepository.addBook.mockResolvedValue(true);

      await bookFormController.createBook(mockBook);

      expect(booksRepository.addBook).toHaveBeenCalledWith(mockBook);
      expect(booksStore.setSubmitting).toHaveBeenCalledWith(true);
      expect(booksStore.setSubmissionError).toHaveBeenCalledWith(null);
      expect(booksStore.setSubmitting).toHaveBeenCalledWith(false);
      expect(booksController.loadPrivateBooks).toHaveBeenCalled();
    });

    test('should handle errors', async () => {
      booksRepository.addBook.mockResolvedValue(false);

      await bookFormController.createBook(mockBook);

      expect(booksStore.setSubmissionError).toHaveBeenCalledWith('Failed to add book');
      expect(booksStore.setSubmitting).toHaveBeenCalledWith(false);
    });

    test('should handle API exceptions', async () => {
      const error = new Error('Network error');
      booksRepository.addBook.mockRejectedValue(error);

      await bookFormController.createBook(mockBook);

      expect(booksStore.setSubmissionError).toHaveBeenCalledWith(error.message);
      expect(booksStore.setSubmitting).toHaveBeenCalledWith(false);
    });

    test('should update private book count after adding a book', async () => {
      booksRepository.addBook.mockResolvedValue(true);

      await bookFormController.createBook(mockBook);

      expect(booksController.loadPrivateBooks).toHaveBeenCalled();
      expect(booksStore.setViewMode).toHaveBeenCalledWith('private');
    });
  });
});