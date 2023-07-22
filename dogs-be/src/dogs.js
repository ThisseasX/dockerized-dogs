const express = require("express");
const { Dog } = require("./models");

const dogsRouter = express.Router();

dogsRouter
  .get("/", async (req, res) => {
    const dogs = await Dog.find();

    res.json(dogs);
  })
  .get("/:name", async (req, res) => {
    const dog = await Dog.findOne({ name: req.params.name });

    res.json(dog);
  })
  .post("/", async (req, res) => {
    const dog = await new Dog(req.body).save();

    res.json(dog);
  })
  .put("/:name", async (req, res) => {
    const dog = await Dog.findOneAndUpdate({}, { $set: req.body }, { new: true });

    res.json(dog);
  })
  .delete("/:name", async (req, res) => {
    const dog = await Dog.findOneAndDelete({ name: req.params.name });

    res.json(dog);
  })
  .delete("/", async (req, res) => {
    await Dog.deleteMany();

    res.json();
  });

module.exports = dogsRouter;
