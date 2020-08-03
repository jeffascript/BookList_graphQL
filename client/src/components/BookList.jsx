import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
// import { useState } from "react";

const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;

const BookList = ({ data }) => {
  console.log(data);

  //   const [propData, setPropData] = useState(data);

  const displayBooks = () => {
    if (data.loading) {
      return <div>Loading books ...</div>;
    }
    return data.books.map(({ name, id }) => (
      <div key={id}>
        <li>{name}</li>
      </div>
    ));
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
