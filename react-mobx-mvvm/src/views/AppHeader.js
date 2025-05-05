import React from "react";
import { observer } from "mobx-react";
import booksController from "../controllers/BooksController";

const AppHeader = () => {
  const { privateBookCount } = booksController;

  return (
    <header className="sticky-header">
      <div className="private-book-counter">{`Your books: ${privateBookCount}`}</div>
    </header>
  );
};

export default observer(AppHeader);