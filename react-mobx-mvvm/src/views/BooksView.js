import React from "react";
import { observer } from "mobx-react";
import BookFormView from "./BookFormView";
import BooksListView from "./BooksListView";
import AppHeader from "./AppHeader";
import booksController from "../controllers/BooksController";

const BooksView = () => {
  const { booksStore } = booksController;

  return (
    <div>
      <AppHeader />
      <div>
        {booksStore.showBookForm ? (
          <BookFormView />
        ) : (
          <BooksListView />
        )}
      </div>
    </div>
  );
};

export default observer(BooksView);