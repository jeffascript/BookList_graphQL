import React from "react";
import BookList from "./components/BookList";

// import { HttpLink } from "apollo-boost";
// import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBook from "./components/AddBook";

// const client = new ApolloClient({
//   link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>Jeff's Reading List</h1>

      <BookList />
      <AddBook />
    </ApolloProvider>
  );
}

export default App;
