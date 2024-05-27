const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");

const app = express();
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("Connected to database");
  })
  .catch((error) => {
    logger.error("Error connecting to database: ", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
