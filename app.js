require("dotenv").config();

const dbPath = process.env.NODE_ENV === "test" ? "./spec/db" : "./config/db";

require(dbPath);

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const challengesRouter = require("./routes/challenges");
const { handleNotFound, handleDefaultError } = require("./errorHandler");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/challenges", challengesRouter);

app.use(handleNotFound);
app.use(handleDefaultError);

module.exports = app;
