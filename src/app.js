const express = require('express');

const { peopleRoutes } = require('./routes');

const app = express();

app.use(express.json());

app.use('/people', peopleRoutes);

module.exports = app;
