const express = require('express');
const app = express();

const notesRouter = require('./notes');

app.use('/notes', notesRouter)

module.exports = app;