export default function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return <div className="empty-notes">Nenhuma nota encontrada</div>;
  }

  return (
    <div className="note-list">
      <h2>Suas Notas</h2>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-meta">
              <small>
                Criada em: {new Date(note.createdAt).toLocaleDateString()}
              </small>
              <small>
                Atualizada em: {new Date(note.updatedAt).toLocaleDateString()}
              </small>
            </div>
            <div className="note-actions">
              <button onClick={() => onEdit(note)} className="edit-btn">
                Editar
              </button>
              <button onClick={() => onDelete(note.id)} className="delete-btn">
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}