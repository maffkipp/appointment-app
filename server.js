// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
require("dotenv").config();
require("./services/passport");
require("./models/user");

// App setup
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secret: "secretKey"
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Server routes
app.get("/", (req, res) => {
  res.render("index.ejs", { user: req.user });
});

require("./routes/authRoutes")(app);

// App start
app.listen(port, err => {
  if (err) console.error(err);
  else console.log(`app running on port ${port}!`);
});
