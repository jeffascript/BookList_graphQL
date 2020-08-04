import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

const BookDetails = (props) => {
  const displayBookDetails = () => {
    const { book } = props.data;
    console.log(book);
    if (book) {
      const { name, genre, author } = book;
      return (
        <div>
          <h2>{name}</h2>
          <p>{genre}</p>
          <p>{author.name}</p>
          <p>All books by this Author:</p>
          <ul className="other-books">
            {author.books.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book Selected...</div>;
    }
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
