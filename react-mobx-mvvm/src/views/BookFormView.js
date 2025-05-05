import React from "react";
import { observer } from "mobx-react";
import bookFormController from "../controllers/BookFormController";

const BookFormView = () => {
  const { isSubmitting, submissionError } = bookFormController;

  return (
    <div>
      <h3>Add New Book</h3>
      <form onSubmit={bookFormController.handleFormSubmit}>
        <div>
          <label htmlFor="name">Book Title:</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            name="author"
            type="text"
            required
            disabled={isSubmitting}
          />
        </div>

        {submissionError && <div style={{ color: "red" }}>{submissionError}</div>}

        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Book"}
          </button>
          <button type="button" onClick={bookFormController.toggleVisibility} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default observer(BookFormView);