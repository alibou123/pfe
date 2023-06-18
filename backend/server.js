const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();

console.log(`Session: ${process.env.NODE_ENV}`);

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("Connection to MongoDB failed", err.message);
  }
};

const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT}!`)
);

connectDB();

mongoose.connection.on("open", () =>
  console.log("Connection to database has been established successfully")
);

mongoose.connection.on("error", (err) => {
  console.log(err);
});

process.on("unhandledRejection", async (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
