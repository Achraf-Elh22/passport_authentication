const express = require("express");
const { ensureAuthentication } = require("../config/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("Welcome");
});

router.get("/dashboard", ensureAuthentication, (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
});

module.exports = router;
