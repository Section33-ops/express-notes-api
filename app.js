import express from 'express';

const app = express();
const port = 8080;

const notes = [];

app.use(express.json());

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  notes.push({ id: notes.length + 1, title: title, content: content });
});

app.get('/notes/:id', (req, res) => {
  const findId = Number(req.params.id);
  const findNote = notes.filter((note) => note.id === findId);
  res.json(findNote);
});

app.listen(port, () => {
  console.log(`Notes API is up and running on port ${port}`);
});
