import { useState, useEffect } from 'react';

export default function NoteForm({ note, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onSave({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2>{note ? 'Editar Nota' : 'Nova Nota'}</h2>
      
      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Conteúdo</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite o conteúdo"
          required
          rows={5}
        />
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancelar
        </button>
        <button type="submit" className="save-btn">
          {note ? 'Atualizar' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}