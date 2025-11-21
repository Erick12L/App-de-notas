import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import { API_URL } from "./config";

export default function App() {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const res = await fetch(`${API_URL}/notes`);
    const data = await res.json();
    setNotes(data);
  };

  const addNote = async (note) => {
    const res = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });

    const newNote = await res.json();
    setNotes([...notes, newNote]);
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    setNotes(notes.filter((n) => n.id !== id));
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notas</Text>

      <NoteForm onAdd={addNote} />

      <NoteList notes={notes} onDelete={deleteNote} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
