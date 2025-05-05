import React from "react";
import { observer } from "mobx-react";
import BooksSwitch from "./BooksSwitch";
import booksController from "../controllers/BooksController";
import bookFormController from "../controllers/BookFormController";

const BooksListView = () => {
  const { books, isLoading, error } = booksController;
  const { toggleVisibility } = bookFormController;

  return (
    <div>
      <h2>Books List</h2>

      <BooksSwitch />

      {isLoading && <div>Loading books...</div>}

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {!isLoading && !error && books.length === 0 && (
        <div>No books available</div>
      )}

      {books.map((book, i) => (
        <div key={book.id || i}>
          {book.author}: {book.name}
        </div>
      ))}

      <button
        onClick={toggleVisibility}
        disabled={isLoading}
      >
        Add Book
      </button>
    </div>
  );
};

export default observer(BooksListView);