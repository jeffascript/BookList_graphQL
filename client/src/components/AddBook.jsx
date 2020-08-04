import React, { useState } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = (props) => {
  const { getAuthorsQuery, addBookMutation } = props;
  //   console.log(props);

  const data = getAuthorsQuery;
  const [bookState, setBookState] = useState({
    name: "",
    genre: "",
    authorId: "",
  }); // name, genre, authorId

  const displayAuthors = () => {
    if (data.loading) {
      return <option disabled> Loading Authors ... </option>;
    }
    return data.authors.map(({ name, id }) => (
      <option key={id} value={id}>
        {name}
      </option>
    ));
  };

  const submitForm = (e) => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name: bookState.name,
        genre: bookState.genre,
        authorId: bookState.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book Name:</label>
        <input
          type="text"
          onChange={(e) =>
            setBookState({
              ...bookState,
              name: e.target.value,
            })
          }
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) =>
            setBookState({
              ...bookState,
              genre: e.target.value,
            })
          }
        />
      </div>

      <div className="field">
        <label> Author:</label>
        <select
          onChange={(e) =>
            setBookState({
              ...bookState,
              authorId: e.target.value,
            })
          }
        >
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>
      <button> + </button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
