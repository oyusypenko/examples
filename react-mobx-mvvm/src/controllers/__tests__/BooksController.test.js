import { BooksController } from '../BooksController';
import { runInAction } from 'mobx';

jest.mock('mobx', () => {
  const actual = jest.requireActual('mobx');
  return {
    ...actual,
    runInAction: jest.fn(fn => fn()),
    makeObservable: jest.fn(),
    computed: jest.fn()
  };
});

describe('BooksController', () => {
  const mockBooks = [
    { id: '1', name: 'Wind in the willows', author: 'Kenneth Graeme' },
    { id: '2', name: 'Crime and Punishment', author: 'Dostoevsky F.' }
  ];

  const mockPrivateBooks = [
    { id: '3', name: 'Private Book', author: 'Private Author', isPrivate: true },
    { id: '4', name: 'Private Book 2', author: 'Private Author 2', isPrivate: true },
  ];

  let mockStore;
  let mockRepo;
  let mockFormController;
  let controller;

  beforeEach(() => {
    jest.clearAllMocks();

    mockStore = {
      books: [],
      isLoading: false,
      error: null,
      privateBookCount: 0,
      showBookForm: false,
      viewMode: 'all'
    };

    mockRepo = {
      getBooks: jest.fn(),
      getPrivateBooks: jest.fn()
    };

    mockFormController = {
      toggleVisibility: jest.fn()
    };

    controller = new BooksController(
      mockStore,
      mockRepo,
      mockFormController,
      false
    );
  });

  describe('loadBooks workflow', () => {
    test('should handle the complete loading lifecycle with success and error cases', async () => {
      mockRepo.getBooks.mockResolvedValue(mockBooks);

      const storeChanges = [];
      runInAction.mockImplementation(fn => {
        fn();
        storeChanges.push({ ...mockStore });
      });

      await controller.loadBooks();

      expect(storeChanges[0].isLoading).toBe(true);
      expect(storeChanges[1].books).toEqual(mockBooks);
      expect(storeChanges[1].isLoading).toBe(false);

      expect(runInAction).toHaveBeenCalledTimes(2);

      storeChanges.length = 0;
      const error = new Error('API Error');
      mockRepo.getBooks.mockRejectedValue(error);
      runInAction.mockClear();

      await controller.loadBooks();

      expect(storeChanges[0].isLoading).toBe(true);
      expect(storeChanges[1].error).toBe(error.message);
      expect(storeChanges[1].isLoading).toBe(false);

      expect(runInAction).toHaveBeenCalledTimes(2);
    });
  });

  describe('view mode switching', () => {
    test('should toggle view modes and trigger appropriate data loading', () => {
      const loadBooksSpy = jest.spyOn(controller, 'loadBooks')
        .mockImplementation(() => Promise.resolve());
      const loadPrivateBooksSpy = jest.spyOn(controller, 'loadPrivateBooks')
        .mockImplementation(() => Promise.resolve());

      mockStore.viewMode = 'all';
      runInAction.mockClear();

      controller.toggleViewMode();
      expect(mockStore.viewMode).toBe('private');
      expect(loadPrivateBooksSpy).toHaveBeenCalledTimes(1);
      expect(loadBooksSpy).not.toHaveBeenCalled();

      expect(runInAction).toHaveBeenCalledTimes(1);

      controller.toggleViewMode();
      expect(mockStore.viewMode).toBe('all');
      expect(loadBooksSpy).toHaveBeenCalledTimes(1);

      loadBooksSpy.mockRestore();
      loadPrivateBooksSpy.mockRestore();
    });
  });

  test('should initialize with loadBooks', () => {
    const loadBooksSpy = jest.spyOn(controller, 'loadBooks')
      .mockImplementation(() => Promise.resolve());

    controller.initLoadBooks();

    expect(loadBooksSpy).toHaveBeenCalledTimes(1);

    loadBooksSpy.mockRestore();
  });

  test('should correctly count private books after loading data', async () => {
    const mixedBooks = [
      { id: '1', name: 'Public Book 1', author: 'Author 1', isPrivate: false },
      { id: '2', name: 'Private Book 1', author: 'Author 2', isPrivate: true },
      { id: '3', name: 'Public Book 2', author: 'Author 3', isPrivate: false },
      { id: '4', name: 'Private Book 2', author: 'Author 4', isPrivate: true }
    ];

    Object.defineProperty(mockStore, 'privateBookCount', {
      get: function () {
        return this.books.filter(book => book.isPrivate).length;
      }
    });

    mockRepo.getBooks.mockResolvedValue(mixedBooks);
    await controller.loadBooks();

    expect(mockStore.books.length).toBe(4);
    expect(mockStore.privateBookCount).toBe(2);

    const onlyPrivateBooks = mixedBooks.filter(book => book.isPrivate);
    mockRepo.getPrivateBooks.mockResolvedValue(onlyPrivateBooks);
    await controller.loadPrivateBooks();

    expect(mockStore.books.length).toBe(2);
    expect(mockStore.privateBookCount).toBe(2);

    mockStore.books.push({ id: '5', name: 'New Private Book', author: 'Author 5', isPrivate: true });
    expect(mockStore.privateBookCount).toBe(3);

    mockStore.books[0].isPrivate = false;
    expect(mockStore.privateBookCount).toBe(2);
  });
});
