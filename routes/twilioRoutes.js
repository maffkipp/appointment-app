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

  // gets all appointments for a specific user
  app.get("/users/:userid", async (req, res) => {
    const userId = req.params.userid;
    const user = await User.findById( userId, (err, data) => {
      if (err) console.error(err);
      else return data;
    });
    res.send(user);
  });

  // adds new appointment to database
  app.post("/appointments", async (req, res) => {
    const appointment = new Appointment({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      notification: req.body.notification,
      timeZone: req.body.timeZone,
      user: req.body.userid
    });
    // save appointment to db
    appointment.save(err => {
      if (err) console.error(err);
    });
    // finds current user
    const currentUser = await User.findById( req.body.userid, (err) => {
      if (err) console.error(err);
    });
    // adds appointment to user's list of appointments
    currentUser.appointments.push(appointment);
    currentUser.save(err => {
      if (err) console.error(err);
    });
    res.redirect("/");
  });

  // deletes appointment in db
  app.delete("/appointments/:appointmentid", (req, res) => {
    const appointmentId = req.params.appointmentid;
    Appointment.deleteOne( { _id : appointmentId }, (err, data) => {
      err ? res.status(500).send(err) : res.redirect("/appointments");
    });
  });
};
