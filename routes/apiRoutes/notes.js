const noteRouter = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../../helpers/fsUtils');
const uuid = require('../../helpers/uuid');

noteRouter.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)));
});

noteRouter.post('/', (req, res) => {

  const { title, text } = req.body;

  if(req.body) {
    const newNote = {
      title,
      text,
      note_Id: uuid(),
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

noteRouter.delete('/:id', (req, res) => {
  const noteID = req.params.id;

  readFromFile('./db/db.json').then(data => {
    let parsedData = JSON.parse(data);

    let filteredNotes = parsedData.filter(item => item.note_Id !== noteID);

    return filteredNotes;

  }).then(response => {
    writeToFile('./db/db.json', response);
    res.json(response);
  });
});

module.exports = noteRouter;
