const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

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
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
