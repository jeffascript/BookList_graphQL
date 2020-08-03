const express = require("express");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();

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
