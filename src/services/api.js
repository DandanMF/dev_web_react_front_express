// Configuração para ambiente local e produção
const API_BASE_URL = process.env.REACT_APP_API_URL || 
                     'https://dev-web-express-backend.onrender.com';

// Função auxiliar para requisições
async function makeRequest(endpoint, method = 'GET', body = null) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erro na requisição: ${response.status}`);
  }

  return response.json();
}

export const getNotes = () => makeRequest('/api/notes');
export const createNote = (note) => makeRequest('/api/notes', 'POST', note);
export const updateNote = (id, note) => makeRequest(`/api/notes/${id}`, 'PUT', note);
export const deleteNote = (id) => makeRequest(`/api/notes/${id}`, 'DELETE');
