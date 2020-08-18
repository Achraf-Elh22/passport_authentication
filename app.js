const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const mainRoute = require('./routes/index');
const usersRoutes = require('./routes/users');

const app = express();

// DB
const dbUrl = require('./config/key').mongoUrl;
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfully 👍👍'))
  .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', mainRoute);
app.use('/users', usersRoutes);

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server start on port ${port}`));
