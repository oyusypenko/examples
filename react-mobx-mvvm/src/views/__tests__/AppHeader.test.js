import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppHeader from '../AppHeader';

jest.mock('../../controllers/BooksController', () => {
  const mockStore = {
    privateBookCount: 0
  };

  const mockController = {
    booksStore: mockStore
  };

  return {
    __esModule: true,
    BooksController: jest.fn().mockImplementation(() => {
      return {
        booksStore: mockStore
      };
    }),
    default: mockController
  };
});

jest.mock('mobx-react', () => ({
  observer: (component) => component,
}));

describe('AppHeader', () => {
  let mockStore;

  beforeEach(() => {
    jest.clearAllMocks();

    mockStore = {
      privateBookCount: 0
    };


    require('../../controllers/BooksController').default.booksStore = mockStore;
  });

  test('should reactively display book count from controller state', () => {
    const { rerender } = render(<AppHeader />);
    expect(screen.getByText('Your books: 0')).toBeInTheDocument();

    mockStore.privateBookCount = 42;
    rerender(<AppHeader />);
    expect(screen.getByText('Your books: 42')).toBeInTheDocument();

    mockStore.privateBookCount = 7;
    rerender(<AppHeader />);
    expect(screen.getByText('Your books: 7')).toBeInTheDocument();
  });
});