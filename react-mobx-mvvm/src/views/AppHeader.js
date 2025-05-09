import React from "react";
import { observer } from "mobx-react";
import booksController from "../controllers/BooksController";

const AppHeader = () => {
  const { booksStore } = booksController;

  return (
    <header className="sticky-header">
      <div className="private-book-counter">{`Your books: ${booksStore.privateBookCount}`}</div>
    </header>
  );
};

export default observer(AppHeader);