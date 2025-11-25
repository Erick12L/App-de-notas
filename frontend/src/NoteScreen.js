import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function NoteScreen({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
  if (note.id) {
    onSave({ ...note, title, content });
  } else {
    onSave({ title, content });
  }
  onClose();
};


  return (
    <View style={styles.container}>
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
  }
});