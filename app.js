import express from 'express';

const app = express();
const port = 8080;

const notes = [];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.listen(port, () => {
  console.log(`Notes API is up and running on port ${port}`);
});
