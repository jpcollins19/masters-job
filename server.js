//purchase a website domain

const express = require("express");
const app = express();
const { syncAndSeed } = require("./server/db/postgres_info.js");
const path = require("path");

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.use("/public/css", express.static(path.join(__dirname, "public/css")));
app.use("/public/pics", express.static(path.join(__dirname, "public/pics")));

app.use("/", require("./server/routers/golfer_router.js"));
app.use("/", require("./server/routers/participant_router.js"));
app.use("/", require("./server/routers/auth_router.js"));
app.use("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "html/main.html"))
);

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 1919;
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
