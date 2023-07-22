const mongoose = require("mongoose");

const Dog = mongoose.model("Dog", {
  name: String,
  age: Number,
  breed: String,
});

module.exports = { Dog };
