const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// const books = [
//   { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
//   { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
//   { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
//   { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" },
// ];

// const authors = [
//   { name: "Patrick Rothfuss", age: 44, id: "1" },
//   { name: "Brandon Sanderson", age: 42, id: "2" },
//   { name: "Terry Pratchett", age: 66, id: "3" },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent); // { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' }
        // return authors.find((oneAuthor) => oneAuthor.id === parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    // wrapped inside a function so that it takes cognisance of the types before it is run
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        console.log(parent);
        // return books.filter((book) => book.authorId === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        console.log(typeof args.id);
        // return books.find((oneBook) => oneBook.id === args.id);
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return authors.find((oneAuthor) => oneAuthor.id === args.id);
      },
    },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
