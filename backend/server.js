const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

//Leer notas
app.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./notes.json'));
  res.json(notes);
});

//Crear nota
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const notes = JSON.parse(fs.readFileSync('./notes.json'));

  const newNote = {
    id: Date.now(),
    title,
    content
  };

  notes.push(newNote);
  fs.writeFileSync('./notes.json', JSON.stringify(notes, null, 2));

  res.json(newNote);
});

//Borrar nota
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  let notes = JSON.parse(fs.readFileSync('./notes.json'));

  notes = notes.filter(note => note.id !== Number(id));
  fs.writeFileSync('./notes.json', JSON.stringify(notes, null, 2));

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});