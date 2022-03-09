const app = require("express").Router();
const {
  models: { Participant },
} = require("../db/postgres_info.js");

module.exports = app;

app.get("/api/participants", async (req, res, next) => {
  try {
    const participants = await Participant.findAll();
    res.send(participants);
  } catch (err) {
    next(err);
  }
});

app.put("/api/participants/:id", async (req, res, next) => {
  try {
    const part = await Participant.findByPk(req.params.id);

    res.status(204).send(await part.update(req.body));
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

// app.use((err, req, res, next) => {
//   res.status(500).send("BLUE", err);
// });
