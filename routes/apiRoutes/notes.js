const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../../helpers/fsUtils');
const uuid = require('../../helpers/uuid');

notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.info(`${req.method} request received to update notes`);

  const { title, text } = req.body;

  if(title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    const response = {
      status: 'success',
      body: newNote,
    };
    res.json(response)
  }
  else {
    res.status(400).send('The note is not formatted properly');
  }
});

notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received to delete note`);

  const { id } = req.params;

  readFromFile('./db/db.json').then((data) => {
    let parsedNotes = JSON.parse(data);

    let filteredNotes = parsedNotes.filter(note => note.id !== id);

    return filteredNotes;

  }).then(response => {

    writeToFile('./db/db.json', response);

    res.json(response);
  });
});

module.exports = notes;
