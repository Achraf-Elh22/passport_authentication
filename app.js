const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const mainRoute = require('./routes/index');
const usersRoutes = require('./routes/users');

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', mainRoute);
app.use('/users', usersRoutes);

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server start on port ${port}`));
