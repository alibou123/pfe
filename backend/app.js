const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");

const AppError = require("./utils/appError");

const globalErrorHandler = require("./controllers/errorController");

const postHandler = require("./routes/postRouter");
const horaireHandler = require("./routes/horaireRouter");
const eventHandler = require("./routes/eventRouter");
const factoryHandler = require("./routes/factoryRouter");
const donationHandler = require("./routes/donationRouter");
const stockTypeHandler = require("./routes/stockTypeRouter");
const skillCategoryHandler = require("./routes/skillCategoryRouter");
const authenticationHandler = require("./routes/authenticationRouter");

const app = express();

// Implement CORS
app.use(cors());
app.options("*", cors());

// Development logging
// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Data compression middleware
app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/post", postHandler);
app.use("/event", eventHandler);
app.use("/factory", factoryHandler);
app.use("/horaire", horaireHandler);
app.use("/donation", donationHandler);
app.use("/auth", authenticationHandler);
app.use("/stock/type", stockTypeHandler);
app.use("/skill/category", skillCategoryHandler);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Impossible de trouver ${req.originalUrl} sur ce serveur !`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
