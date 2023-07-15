const express = require('express');
const app = express();

app.use(express.json());

const loginRoutes = require('./routes/loginRoutes');

app.use('/login', loginRoutes)

module.exports = app;
