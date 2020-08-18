const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // check the required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'please fill in all the fields' });
  }

  // check if the password and password2 match
  if (password !== password2) {
    errors.push({ msg: 'Passwords dont match' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should at least 6 charactere' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  }

  res.send('pass');
});

module.exports = router;
