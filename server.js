// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
require('dotenv').config();
require('./services/passport');
require('./models/user');

mongoose.connect(process.env.MONGO_URI);

// App setup
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(passport.initialize());
app.use(passport.session());

// Server routes
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

// App start
app.listen(port, err => {
  if (err) console.error(err);
  else console.log(`app running on port ${port}!`);
});
