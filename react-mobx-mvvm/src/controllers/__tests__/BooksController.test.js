import booksController from '../BooksController';
import booksStore from '../../stores/BooksStore';
import booksRepository from '../../repositories/BooksRepository';

jest.mock('mobx', () => ({
  runInAction: jest.fn(fn => fn()),
  makeObservable: jest.fn(),
  computed: jest.fn()
}));

jest.mock('../../stores/BooksStore', () => ({
  setBooks: jest.fn(),
  setLoading: jest.fn(),
  setError: jest.fn(),
  setPrivateBookCount: jest.fn(),
  viewMode: 'all',
  setViewMode: jest.fn(),
  books: [],
  isLoading: false,
  error: null,
  privateBookCount: 0,
  showBookForm: false
}));

jest.mock('../../repositories/BooksRepository', () => ({
  getBooks: jest.fn(),
  getPrivateBooks: jest.fn()
}));

jest.mock('../BookFormController', () => ({
  toggleVisibility: jest.fn()
}));

describe('BooksController', () => {
  const mockBooks = [
    { id: '1', name: 'Wind in the willows', author: 'Kenneth Graeme' },
    { id: '2', name: 'Crime and Punishment', author: 'Dostoevsky F.' }
  ];

  const mockPrivateBooks = [
    { id: '3', name: 'Private Book', author: 'Private Author' },
    { id: '4', name: 'Private Book 2', author: 'Private Author 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('computed properties', () => {
    test('should return store properties', () => {
      Object.defineProperty(booksStore, 'books', { get: () => mockBooks });
      Object.defineProperty(booksStore, 'isLoading', { get: () => true });
      Object.defineProperty(booksStore, 'error', { get: () => 'Test error' });
      Object.defineProperty(booksStore, 'showBookForm', { get: () => true });
      Object.defineProperty(booksStore, 'viewMode', { get: () => 'private' });
      Object.defineProperty(booksStore, 'privateBookCount', { get: () => 5 });

      expect(booksController.books).toEqual(mockBooks);
      expect(booksController.isLoading).toBe(true);
      expect(booksController.error).toBe('Test error');
      expect(booksController.showBookForm).toBe(true);
      expect(booksController.viewMode).toBe('private');
      expect(booksController.privateBookCount).toBe(5);
    });
  });

  describe('loadBooks', () => {
    test('should load books and update store', async () => {
      booksRepository.getBooks.mockResolvedValue(mockBooks);

      await booksController.loadBooks();

      expect(booksRepository.getBooks).toHaveBeenCalled();
      expect(booksStore.setLoading).toHaveBeenCalledWith(true);
      expect(booksStore.setBooks).toHaveBeenCalledWith(mockBooks);
      expect(booksStore.setLoading).toHaveBeenCalledWith(false);
    });

    test('should handle errors when loading books', async () => {
      const error = new Error('API Error');
      booksRepository.getBooks.mockRejectedValue(error);

      await booksController.loadBooks();

      expect(booksStore.setError).toHaveBeenCalledWith(error.message);
      expect(booksStore.setLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('loadPrivateBooks', () => {
    test('should load private books and update store and counter', async () => {
      booksRepository.getPrivateBooks.mockResolvedValue(mockPrivateBooks);

      await booksController.loadPrivateBooks();

      expect(booksRepository.getPrivateBooks).toHaveBeenCalled();
      expect(booksStore.setPrivateBookCount).toHaveBeenCalledWith(mockPrivateBooks.length);
      expect(booksStore.setBooks).toHaveBeenCalledWith(mockPrivateBooks);
      expect(booksStore.setLoading).toHaveBeenCalledWith(true);
      expect(booksStore.setLoading).toHaveBeenCalledWith(false);
    });

    test('should handle errors when loading private books', async () => {
      const error = new Error('API Error');
      booksRepository.getPrivateBooks.mockRejectedValue(error);

      await booksController.loadPrivateBooks();

      expect(booksStore.setError).toHaveBeenCalledWith(error.message);
      expect(booksStore.setLoading).toHaveBeenCalledWith(false);
    });
  });

  describe('toggleViewMode', () => {
    test('should toggle from all to private and load private books', () => {
      Object.defineProperty(booksStore, 'viewMode', {
        get: () => 'all',
        configurable: true
      });

      booksStore.setViewMode.mockImplementation((mode) => {
        Object.defineProperty(booksStore, 'viewMode', {
          get: () => mode,
          configurable: true
        });
      });

      const originalLoadPrivate = booksController.loadPrivateBooks;
      const originalLoadBooks = booksController.loadBooks;

      booksController.loadPrivateBooks = jest.fn();
      booksController.loadBooks = jest.fn();

      booksController.toggleViewMode();

      expect(booksStore.setViewMode).toHaveBeenCalledWith('private');
      expect(booksController.loadPrivateBooks).toHaveBeenCalled();

      booksController.loadPrivateBooks = originalLoadPrivate;
      booksController.loadBooks = originalLoadBooks;
    });

    test('should toggle from private to all and load all books', () => {
      Object.defineProperty(booksStore, 'viewMode', {
        get: () => 'private',
        configurable: true
      });

      booksStore.setViewMode.mockImplementation((mode) => {
        Object.defineProperty(booksStore, 'viewMode', {
          get: () => mode,
          configurable: true
        });
      });

      const originalLoadPrivate = booksController.loadPrivateBooks;
      const originalLoadBooks = booksController.loadBooks;

      booksController.loadPrivateBooks = jest.fn();
      booksController.loadBooks = jest.fn();

      booksController.toggleViewMode();

      expect(booksStore.setViewMode).toHaveBeenCalledWith('all');
      expect(booksController.loadBooks).toHaveBeenCalled();

      booksController.loadPrivateBooks = originalLoadPrivate;
      booksController.loadBooks = originalLoadBooks;
    });
  });
});