const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  name: String,
  phoneNumber: String,
  notification: Number,
  timeZone: String,
  time: { type: Date, index: true },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = {
  Appointment: Appointment
};
