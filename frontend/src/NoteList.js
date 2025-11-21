import { View, Text, Button, StyleSheet } from 'react-native';

export default function NoteList({ notes, onDelete }) {
  return (
    <View style={styles.list}>
      {notes.map(note => (
        <View key={note.id} style={styles.card}>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.content}>{note.content}</Text>

          <Button
            title="Borrar"
            color="red"
            onPress={() => onDelete(note.id)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6
  },
  content: {
    fontSize: 16,
    marginBottom: 10
  }
});
