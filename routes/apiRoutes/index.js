const app = require('express').Router();
const noteRouter = require('./notes');

app.use(noteRouter);

module.exports = app;