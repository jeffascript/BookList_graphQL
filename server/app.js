const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vjzy5.mongodb.net/graph-test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("open", () => {
  console.log("connected to DB");
});
app.use(cors());

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
