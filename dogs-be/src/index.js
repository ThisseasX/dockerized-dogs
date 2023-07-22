const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dogsRouter = require("./dogs");

mongoose.connect("mongodb://db:27017/Dogs");

const app = express();

app
  .use(cors({ origin: "http://fe" }))
  .use(express.json())
  .use("/dogs", dogsRouter)
  .listen(3000, () => {
    console.log("Listening on port 3000");
  });
