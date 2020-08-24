const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/user");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // check the required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "please fill in all the fields" });
  }

  // check if the password and password2 match
  if (password !== password2) {
    errors.push({ msg: "Passwords dont match" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should at least 6 charactere" });
  }
  if (errors.length > 0) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  }
  // Checking if User exist
  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(() => {
                req.flash(
                  "success_msg",
                  "You are now registered you can log in !"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
