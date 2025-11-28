import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import NoteList from "./NoteList";
import NoteScreen from "./NoteScreen";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState(null);

  //Uso de almacenamiento local
  const loadNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("NOTES");
      const savedNotes = jsonValue != null ? JSON.parse(jsonValue) : [];
      setNotes(savedNotes);
    } catch (e) {
      console.error("Error cargando notas", e);
    }
  };

  const saveNotes = async (notesToSave) => {
    try {
      await AsyncStorage.setItem("NOTES", JSON.stringify(notesToSave));
    } catch (e) {
      console.error("Error guardando notas", e);
    }
  };

  //Guardar
  const addNote = async (note) => {
    const newNote = { ...note, id: Date.now().toString() };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    await saveNotes(newNotes);
  };

  //Editar
  const updateNote = async (note) => {
    const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
    setNotes(updatedNotes);
    await saveNotes(updatedNotes);
  };

  //Eliminar
  const deleteNote = async (id) => {
    const filteredNotes = notes.filter((n) => n.id !== id);
    setNotes(filteredNotes);
    await saveNotes(filteredNotes);
  };

  const filteredNotes = notes.filter(
    (n) =>
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
        setViewing(null);
      }}
      onClose={() => setViewing(null)}
    />
  ) : (
    <LinearGradient
      colors={["#ece1e8ff", "#eb97cbff", "#ef9fd1ff"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={styles.title}>Notas</Text>

        <TextInput
          placeholder="Escribe para buscar una nota!"
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 5,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: "#ccc",
          }}
        />

        <View style={{ marginBottom: 20 }}>
          <Button
            title="Agregar nota"
            onPress={() => setViewing({ title: "", content: "", color: "#ffffff" })}
          />
        </View>

        <NoteList notes={filteredNotes} onDelete={deleteNote} onSelect={openNoteScreen} />
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
    fontWeight: "bold",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
});
