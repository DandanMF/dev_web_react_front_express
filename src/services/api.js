const API_URL = 'https://notes-api.onrender.com/api';

// Função auxiliar para fazer requisições
async function fetchAPI(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include' // Se estiver usando cookies/sessões
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro na requisição');
  }

  return response.json();
}

export const getNotes = async () => fetchAPI('/notes');
export const createNote = async (note) => fetchAPI('/notes', 'POST', note);
export const updateNote = async (id, note) => fetchAPI(`/notes/${id}`, 'PUT', note);
export const deleteNote = async (id) => fetchAPI(`/notes/${id}`, 'DELETE');