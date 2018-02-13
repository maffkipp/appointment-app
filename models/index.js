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
  err => {
    if (err) throw err;
  }
);

module.exports = {
  User: userModel.User,
  Appointment: appointmentModel.Appointment
};
