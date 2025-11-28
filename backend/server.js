const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4000;

const NOTES_PATH = path.join(__dirname, 'notes.json');

app.use(cors({ origin: "*" }));
app.use(express.json());

// Leer notas
app.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(NOTES_PATH));
  res.json(notes);
});

// Crear nota
app.post('/notes', (req, res) => {
  const { title, content, color } = req.body;
  const notes = JSON.parse(fs.readFileSync(NOTES_PATH));

  const newNote = {
    id: Date.now(),
    title,
    content,
    color: color || '#ffffff'
  };

  notes.push(newNote);
  fs.writeFileSync(NOTES_PATH, JSON.stringify(notes, null, 2));

  res.json(newNote);
});

// Borrar nota
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  let notes = JSON.parse(fs.readFileSync(NOTES_PATH));

  notes = notes.filter(note => note.id !== Number(id));
  fs.writeFileSync(NOTES_PATH, JSON.stringify(notes, null, 2));

  res.json({ success: true });
});

// Editar nota
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, color } = req.body;

  let notes = JSON.parse(fs.readFileSync(NOTES_PATH));
  const index = notes.findIndex(n => n.id === Number(id));

  if (index === -1) return res.status(404).json({ error: 'Nota no encontrada' });

  notes[index] = {
    ...notes[index],
    title,
    content,
    color: color || notes[index].color
  };

  fs.writeFileSync(NOTES_PATH, JSON.stringify(notes, null, 2));

  res.json(notes[index]);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});