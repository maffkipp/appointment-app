const { User, Appointment } = require("../models/index");

module.exports = app => {
  // gets list of appointments
  app.get("/appointments", async (req, res) => {
    const appointments = await Appointment.find();
    res.send(appointments);
  });

  // get list of users
  app.get("/users", async (req, res) => {
    const users = await User.find();
    res.send(users);
  });

  // adds new appointment to database
  app.post("/appointments", async (req, res) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const notification = req.body.notification;
    const timeZone = req.body.timeZone;
    const time = req.body.date + req.body.time;

    const appointment = new Appointment({
      name: name,
      phoneNumber: phoneNumber,
      notification: notification,
      timeZone: timeZone,
      time: time
    });
    await appointment.save();
    res.redirect("/appointments");
  });
};
