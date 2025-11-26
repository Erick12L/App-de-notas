import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function NoteScreen({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color || "#ffffff");

  const handleSave = () => {
  if (note.id) {
    onSave({ ...note, title, content, color });
  } else {
    onSave({ title, content, color });
  }
  onClose();
};


  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <TextInput
        style={styles.title}
        value={title}
        placeholder="Título"
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.content}
        multiline
        value={content}
        placeholder="Contenido"
        onChangeText={setContent}
      />

      <View style={styles.colorRow}>
        {["#fff","#f4f1bb","#ffb3c1","#a0e7e5","#b4f8c8","#bde0fe"].map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.colorCircle, { backgroundColor: c, borderColor: c === color ? "black" : "#ccc" }]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      <Button title="Guardar y regresar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
     flex: 1,
     padding: 20,
     paddingBottom: 60,
     backgroundColor: '#ffffffff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10
  },
  content: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: 'top',
    padding: 10
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2
  }
});