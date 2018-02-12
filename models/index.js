const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const userModel = require("./user");
const appointmentModel = require("./appointment");

// Fixed unhandled promise rejection bug
mongoose.Promise = global.Promise;

// Connect to DB
mongoose.connection.openUri(
  process.env.MONGO_URI || process.env.DB_CONN,
  {},
  (err, conn) => {
    if (err) console.log(`Error connecting to MongoDB: ${err}`);
    else console.log("Connected to MongoDB successfully!");
  }
);

module.exports = {
  User: userModel.User
};
