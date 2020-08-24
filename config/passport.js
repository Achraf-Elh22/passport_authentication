const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      // Check if the user exist
      User.findOne({ email })
        .then((user) => {
          if (!user)
            return done(null, false, {
              message: "That email is not registered",
            });
          // Match password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
