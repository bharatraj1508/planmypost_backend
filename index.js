require("dotenv").config();
require("./src/models/user");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());
const routes = require("./src/routes");

mongoose.connect(process.env.MONGOURI);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo instance");
});

mongoose.connection.on("error", (error) => [
  console.log("Error connecting to mongo instance", error),
]);

app.use("/api", routes);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is online" });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
