import express from 'express';

const app = express();
const port = 8080;

let notes = [];

app.use(express.json());

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  notes.push({ id: notes.length + 1, title: title, content: content });
  res.status(200).json({ message: 'Note added successfully' });
});

app.get('/notes/:id', (req, res) => {
  const findId = Number(req.params.id);
  const findNote = notes.filter((note) => note.id === findId);
  res.json(findNote);
});

app.put('/notes/:id', (req, res) => {
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

app.delete('/notes/:id', (req, res) => {
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
