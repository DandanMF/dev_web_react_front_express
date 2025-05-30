import { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './services/api';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar notas');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (noteData) => {
    try {
      setError(null);
      if (currentNote) {
        await updateNote(currentNote.id, noteData);
      } else {
        await createNote(noteData);
      }
      fetchNotes();
      setCurrentNote(null);
    } catch (err) {
      setError('Erro ao salvar nota');
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
      if (currentNote && currentNote.id === id) {
        setCurrentNote(null);
      }
    } catch (err) {
      setError('Erro ao excluir nota');
    }
  };

  return (
    <div className="app-container">
      <h1>Gerenciador de Notas</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="app-content">
        <NoteForm 
          key={currentNote?.id || 'new'}
          note={currentNote} 
          onSave={handleSave} 
          onCancel={() => setCurrentNote(null)}
        />
        
        {loading ? (
          <div className="loading">Carregando notas...</div>
        ) : (
          <NoteList 
            notes={notes} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
}

export default App;