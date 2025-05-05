import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BooksListView from '../BooksListView';
import booksController from '../../controllers/BooksController';
import bookFormController from '../../controllers/BookFormController';

jest.mock('mobx-react', () => ({
  observer: (component) => component,
}));

jest.mock('../../controllers/BooksController', () => ({
  books: [],
  isLoading: false,
  error: null,
  viewMode: 'all',
  toggleViewMode: jest.fn()
}));

jest.mock('../../controllers/BookFormController', () => ({
  toggleVisibility: jest.fn()
}));

describe('BooksListView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render books list', () => {
    const mockBooks = [
      { id: '1', name: 'Book 1', author: 'Author 1' },
      { id: '2', name: 'Book 2', author: 'Author 2' }
    ];

    Object.defineProperty(booksController, 'books', {
      get: () => mockBooks
    });

    render(<BooksListView />);

    expect(screen.getByText('Author 1: Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author 2: Book 2')).toBeInTheDocument();
  });

  test('should show loading message', () => {
    Object.defineProperty(booksController, 'isLoading', {
      get: () => true
    });

    render(<BooksListView />);

    expect(screen.getByText('Loading books...')).toBeInTheDocument();
  });

  test('should show error message', () => {
    Object.defineProperty(booksController, 'error', {
      get: () => 'Test error'
    });

    render(<BooksListView />);

    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  test('should show empty message when no books', () => {
    Object.defineProperty(booksController, 'books', { get: () => [] });
    Object.defineProperty(booksController, 'isLoading', { get: () => false });
    Object.defineProperty(booksController, 'error', { get: () => null });

    render(<BooksListView />);

    expect(screen.getByText('No books available')).toBeInTheDocument();
  });

  test('should call toggleViewMode when clicking Private Books radio', () => {
    render(<BooksListView />);

    const radioButton = screen.getByLabelText('Private Books');
    fireEvent.click(radioButton);

    expect(booksController.toggleViewMode).toHaveBeenCalled();
  });

  test('should call toggleVisibility when clicking Add Book button', () => {
    render(<BooksListView />);

    fireEvent.click(screen.getByText('Add Book'));

    expect(bookFormController.toggleVisibility).toHaveBeenCalled();
  });
});