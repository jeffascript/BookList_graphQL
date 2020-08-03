const express = require("express");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://graphql:myname123@cluster0.vjzy5.mongodb.net/graph-test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("open", () => {
  console.log("connected to DB");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema, // schema:schema --> es6
    graphiql: true, // to have access to the playground
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`now listening for requests on port ${PORT}`);
});
