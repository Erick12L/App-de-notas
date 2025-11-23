import { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function NoteForm({ onAdd, onSave, initialData, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (initialData) {
      onSave({ id: initialData.id, title, content });
    } else {
      onAdd({ title, content });
    }

    setTitle('');
    setContent('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Contenido"
        value={content}
        onChangeText={setContent}
        style={[styles.input, styles.textarea]}
        multiline
      />

      <Button
        title={initialData ? "Guardar cambios" : "Agregar nota"}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top'
  }
});