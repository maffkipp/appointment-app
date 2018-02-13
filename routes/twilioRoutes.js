const { User, Appointment } = require("../models/index");

module.exports = app => {
  app.get("/appointments", async (req, res) => {
    const appointments = await Appointment.find();
    res.send(appointments);
  });

  app.get("/users", async (req, res) => {
    const users = await User.find();
    res.send(users);
  });

  app.post("/appointments", async (req, res) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const notification = req.body.notification;
    const timeZone = req.body.timeZone;
    const time = req.body.time;

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
