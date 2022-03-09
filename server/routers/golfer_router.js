const app = require("express").Router();
const {
  models: { Golfer },
} = require("../db/postgres_info.js");
const sequelize = require("sequelize");

module.exports = app;

app.get("/api/golfers", async (req, res, next) => {
  try {
    const golfers = await Golfer.findAll({ order: [["odds", "ASC"]] });

    res.send(golfers);
  } catch (err) {
    next(err);
  }
});
