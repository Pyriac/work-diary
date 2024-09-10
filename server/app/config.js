const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: "true",
  })
);

app.use(express.json());

const router = require("./router");
app.use("/api", router);

module.exports = app;
