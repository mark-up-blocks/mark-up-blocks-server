require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const indexRouter = require("./routes/index");
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

app.use(handleNotFound);
app.use(handleDefaultError);

module.exports = app;
