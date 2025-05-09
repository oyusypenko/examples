import { runInAction } from 'mobx';
import { BookFormController } from '../BookFormController';
import Book from '../../models/Book';

jest.mock('mobx', () => {
  return {
    runInAction: jest.fn(fn => fn()),
    makeObservable: jest.fn(),
    computed: jest.fn()
  };
});

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
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
  let mockStore;
  let mockRepo;
  let mockBooksController;
  let controller;

  beforeEach(() => {
    jest.clearAllMocks();

    mockBook = new Book('test-uuid', 'Test Book', 'Test Author');

    mockEvent = {
      preventDefault: jest.fn(),
      target: {}
    };

    mockStore = {
      isSubmitting: false,
      submissionError: null,
      showBookForm: false,
      viewMode: 'all'
    };

    mockRepo = {
      addBook: jest.fn()
    };

    mockBooksController = {
      loadBooks: jest.fn(),
      loadPrivateBooks: jest.fn()
    };

    controller = new BookFormController(
      mockStore,
      mockRepo,
      mockBooksController
    );
  });

  describe('form submission workflow', () => {
    test('should handle complete book creation lifecycle', async () => {
      const createBookSpy = jest.spyOn(controller, 'createBook')
        .mockImplementation(() => Promise.resolve());

      controller.handleFormSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(createBookSpy).toHaveBeenCalledWith(expect.objectContaining({
        id: 'test-uuid',
        name: 'Test Book',
        author: 'Test Author'
      }));

      createBookSpy.mockRestore();

      mockRepo.addBook.mockResolvedValue(true);

      const stateChanges = [];
      runInAction.mockImplementation(fn => {
        fn();
        stateChanges.push({ ...mockStore });
      });

      await controller.createBook(mockBook);

      expect(stateChanges[0].isSubmitting).toBe(true);
      expect(stateChanges[0].submissionError).toBeNull();
      expect(stateChanges[1].isSubmitting).toBe(false);
      expect(mockBooksController.loadPrivateBooks).toHaveBeenCalled();
      expect(stateChanges[1].viewMode).toBe('private');

      stateChanges.length = 0;
      mockRepo.addBook.mockRejectedValue(new Error('Network error'));
      runInAction.mockClear();

      await controller.createBook(mockBook);

      expect(stateChanges[0].isSubmitting).toBe(true);
      expect(stateChanges[1].submissionError).toBe('Network error');
      expect(stateChanges[1].isSubmitting).toBe(false);
    });
  });
});