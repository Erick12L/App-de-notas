import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function NoteList({ notes, onDelete, onSelect }) {
  return (
    <View style={styles.grid}>
      {notes.map(note => (
        <TouchableOpacity
          key={note.id}
          style={[styles.card, { backgroundColor: note.color || '#fff' }]}
          onPress={() => onSelect(note)}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>
              {note.title}
            </Text>
            <Text style={styles.content} numberOfLines={6}>
              {note.content}
            </Text>
          </View>

          <Button
            title="Borrar"
            color="red"
            onPress={() => onDelete(note.id)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'space-between',
    minHeight: 180
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6
  },
  content: {
    fontSize: 15,
    marginBottom: 10
  }
});