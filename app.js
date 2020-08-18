const express = require('express');

const mainRoute = require('./routes/index');
const usersRoutes = require('./routes/users');

const app = express();

// Routes
app.use('/', mainRoute);
app.use('/users', usersRoutes);

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server start on port ${port}`));
