import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppHeader from '../AppHeader';
import booksController from '../../controllers/BooksController';

jest.mock('mobx-react', () => ({
  observer: (component) => component,
}));

jest.mock('../../controllers/BooksController', () => ({
  privateBookCount: 0
}));

describe('AppHeader', () => {
  test('should render private book count', () => {
    Object.defineProperty(booksController, 'privateBookCount', {
      get: () => 42
    });

    render(<AppHeader />);

    expect(screen.getByText('Your books: 42')).toBeInTheDocument();
  });

  test('should render zero books when count is 0', () => {
    Object.defineProperty(booksController, 'privateBookCount', {
      get: () => 0
    });

    render(<AppHeader />);

    expect(screen.getByText('Your books: 0')).toBeInTheDocument();
  });
});