import React from "react";
import { observer } from "mobx-react";
import booksController from "../controllers/BooksController";

const BooksSwitch = () => {
  const { viewMode } = booksController;

  return (
    <div>
      <label>
        <input
          type="radio"
          name="viewMode"
          value="all"
          checked={viewMode === 'all'}
          onChange={booksController.toggleViewMode}
        />
        All Books
      </label>
      <label>
        <input
          type="radio"
          name="viewMode"
          value="private"
          checked={viewMode === 'private'}
          onChange={booksController.toggleViewMode}
        />
        Private Books
      </label>
    </div>
  );
};

export default observer(BooksSwitch);