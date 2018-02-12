const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
require("dotenv").config();

const db = require("../models/index");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await db.User.findOne({ googleId: profile.id });

      if (existingUser) return done(null, existingUser);

      const user = await new db.User({
        googleId: profile.id,
        name: profile.displayName
      }).save();
      done(null, user);
    }
  )
);
