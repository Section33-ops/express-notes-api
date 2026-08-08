import express from 'express';

const app = express();
const port = 8080;

let notes = [];

function logRequest(req, res, next) {
  console.log(`${req.method} request recieved from ${req.originalUrl}!`);
  next();
}

app.use(express.json());

app.get('/notes', logRequest, (req, res) => {
  res.json(notes);
});

app.post('/notes', logRequest, (req, res) => {
  const { title, content } = req.body;
  notes.push({ id: notes.length + 1, title: title, content: content });
  res.status(200).json({ message: 'Note added successfully' });
});

app.get('/notes/find', logRequest, (req, res) => {
  const searchKeyword = req.query.search.toLowerCase();
  const foundNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword),
  );
  res.json(foundNotes);
});

app.get('/notes/:id', logRequest, (req, res) => {
  const findId = Number(req.params.id);
  const findNote = notes.filter((note) => note.id === findId);
  res.json(findNote);
});

app.put('/notes/:id', logRequest, (req, res) => {
  const { content } = req.body;
  const findId = Number(req.params.id);
  const updateNotes = notes.map((note) =>
    note.id === findId ? { ...note, content: content } : note,
  );
  console.log(`UpdateNotes = ${updateNotes}`);
  notes = updateNotes;
  console.log(`Notes = ${notes}`);
  res.json(notes);
});

app.delete('/notes/:id', logRequest, (req, res) => {
  const findId = Number(req.params.id);
  let idNum = 0;
  const updateNotes = notes
    .filter((note) => note.id != findId)
    .map((note) => {
      idNum++;
      return { ...note, id: idNum };
    });
  notes = updateNotes;

  res.json({ message: 'Note deleted successfully' });
});

app.listen(port, () => {
  console.log(`Notes API is up and running on port ${port}`);
});
