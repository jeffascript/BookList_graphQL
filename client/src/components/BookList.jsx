import React from "react";
import { graphql } from "react-apollo";
// import { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
import { useState } from "react";

const BookList = ({ data }) => {
  //   console.log(data);

  //   const [propData, setPropData] = useState(data);

  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    if (data.loading) {
      return <div>Loading books ...</div>;
    }
    return data.books.map(({ name, id }) => (
      <li key={id} onClick={(e) => setSelected(id)}>
        {name}
      </li>
    ));
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
