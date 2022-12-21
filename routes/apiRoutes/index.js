const notes = require('express').Router();

const notesRouter = require('./notes');

notes.use('/notes', notesRouter)

module.exports = notes;