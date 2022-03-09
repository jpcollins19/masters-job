const app = require("express").Router();
const {
  models: { Participant },
} = require("../db/postgres_info.js");

module.exports = app;

app.post("/oauth/authorize", async (req, res, next) => {
  try {
    res.send({ token: await Participant.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

app.get("/oauth/token", async (req, res, next) => {
  try {
    res.send(await Participant.byToken(req.headers.authorization));
  } catch (err) {
    next(err);
  }
});

app.post("/api/add/auth", async (req, res, next) => {
  try {
    const auth = await { ...req.body };
    const user = await Participant.create(auth);
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

// app.use((err, req, res, next) => {
//   res.status(500).send(err);
// });
