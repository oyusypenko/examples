import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BooksListView from '../BooksListView';
import { BooksController } from '../../controllers/BooksController';
import { BookFormController } from '../../controllers/BookFormController';

jest.mock('mobx-react', () => ({
  observer: (component) => component,
}));

jest.mock('../../controllers/BooksController', () => {
  const mockStore = {
    books: [],
    isLoading: false,
    error: null,
    viewMode: 'all'
  };

  const mockController = {
    booksStore: mockStore,
    toggleViewMode: jest.fn()
  };

  return {
    __esModule: true,
    BooksController: jest.fn().mockImplementation((store = mockStore) => {
      return {
        booksStore: store,
        toggleViewMode: jest.fn()
      };
    }),
    default: mockController
  };
});

jest.mock('../../controllers/BookFormController', () => {
  const mockController = {
    toggleVisibility: jest.fn()
  };

  return {
    __esModule: true,
    BookFormController: jest.fn().mockImplementation(() => {
      return {
        toggleVisibility: jest.fn()
      };
    }),
    default: mockController
  };
});

describe('BooksListView', () => {
  let mockStore;
  let mockFormController;

  beforeEach(() => {
    jest.clearAllMocks();

    mockStore = {
      books: [],
      isLoading: false,
      error: null,
      viewMode: 'all'
    };

    mockFormController = {
      toggleVisibility: jest.fn()
    };

    const booksControllerModule = require('../../controllers/BooksController');
    const bookFormControllerModule = require('../../controllers/BookFormController');

    booksControllerModule.default.booksStore = mockStore;
    booksControllerModule.default.toggleViewMode = jest.fn();
    bookFormControllerModule.default.toggleVisibility = mockFormController.toggleVisibility;
  });

  test('should reactively render different states based on controller data', () => {
    const { rerender } = render(<BooksListView />);
    expect(screen.getByText('No books available')).toBeInTheDocument();

    mockStore.isLoading = true;
    rerender(<BooksListView />);
    expect(screen.getByText('Loading books...')).toBeInTheDocument();

    mockStore.isLoading = false;
    mockStore.error = 'Failed to load books';
    rerender(<BooksListView />);
    expect(screen.getByText('Error: Failed to load books')).toBeInTheDocument();

    const mockBooks = [
      { id: '1', name: 'Book 1', author: 'Author 1' },
      { id: '2', name: 'Book 2', author: 'Author 2' }
    ];
    mockStore.error = null;
    mockStore.books = mockBooks;
    rerender(<BooksListView />);
    expect(screen.getByText('Author 1: Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author 2: Book 2')).toBeInTheDocument();
  });

  test('should handle user interactions correctly', () => {
    render(<BooksListView />);

    const privateRadio = screen.getByLabelText('Private Books');
    fireEvent.click(privateRadio);

    const booksControllerModule = require('../../controllers/BooksController').default;
    expect(booksControllerModule.toggleViewMode).toHaveBeenCalledTimes(1);

    const addButton = screen.getByText('Add Book');
    fireEvent.click(addButton);

    const bookFormControllerModule = require('../../controllers/BookFormController').default;
    expect(bookFormControllerModule.toggleVisibility).toHaveBeenCalledTimes(1);
  });
});