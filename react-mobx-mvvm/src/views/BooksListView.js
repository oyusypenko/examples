import React from "react";
import { observer } from "mobx-react";
import { v4 as uuidv4 } from 'uuid';
import BooksSwitch from "./BooksSwitch";
import booksController from "../controllers/BooksController";
import bookFormController from "../controllers/BookFormController";

const BooksListView = () => {
  const { booksStore } = booksController;
  const { toggleVisibility } = bookFormController;

  return (
    <div>
      <h2>Books List</h2>

      <BooksSwitch />

      {booksStore.isLoading && <div>Loading books...</div>}

      {booksStore.error && <div style={{ color: "red" }}>Error: {booksStore.error}</div>}

      {!booksStore.isLoading && !booksStore.error && booksStore.books.length === 0 && (
        <div>No books available</div>
      )}

      {booksStore.books.map((book) => (
        <div key={uuidv4()}>
          {book.author}: {book.name}
        </div>
      ))}

      <button
        onClick={toggleVisibility}
        disabled={booksStore.isLoading}
      >
        Add Book
      </button>
    </div>
  );
};

export default observer(BooksListView);