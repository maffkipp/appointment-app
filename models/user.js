const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }]
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User: User
};
