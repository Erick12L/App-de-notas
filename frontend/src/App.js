import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import NoteList from './NoteList';
import NoteScreen from './NoteScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { API_URL } from "./config";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [viewing, setViewing] = useState(null);

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

  const updateNote = async (note) => {
    const res = await fetch(`${API_URL}/notes/${note.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    });

    const updated = await res.json();
    setNotes(notes.map(n => n.id === updated.id ? updated : n));
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE' });
    setNotes(notes.filter((n) => n.id !== id));
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  const openNoteScreen = (note) => {
    setViewing(note);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return viewing ? (
  <NoteScreen
    note={viewing}
    onSave={(note) => {
      if (note.id) {
        updateNote(note);
      } else {
        addNote(note);
      }
    }}
    onClose={() => setViewing(null)}
  />
) : (
  <LinearGradient
    colors={['#ece1e8ff', '#eb97cbff', '#ef9fd1ff']}
    style={styles.container}
  >
    <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
      
      <Text style={styles.title}>Notas</Text>

      <TextInput
        placeholder="Escribe para buscar una nota!"
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 5,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: '#ccc'
        }}
      />

      <View style={{ marginBottom: 20 }}>
        <Button
          title="Agregar nota"
          onPress={() => setViewing({ title: "", content: "", color: "#ffffff" })}
        />
      </View>

      <NoteList
        notes={filteredNotes}
        onDelete={deleteNote}
        onSelect={openNoteScreen}
      />

    </ScrollView>
  </LinearGradient>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5
  }
});