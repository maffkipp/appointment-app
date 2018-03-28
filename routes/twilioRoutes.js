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
    const appointment = new Appointment({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      notification: req.body.notification,
      timeZone: req.body.timeZone,
      time: req.body.date + req.body.time
    });
    await appointment.save();
    res.redirect("/appointments");
  });

  // deletes appointment in db
  app.delete("/appointments/:appointmentid", (req, res) => {
    const appointmentId = req.params.appointmentid;
    Appointment.deleteOne( { _id : appointmentId }, (err, data) => {
      err ? res.status(500).send(err) : res.redirect("/appointments");
    });
  });
};
