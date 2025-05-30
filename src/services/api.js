const API_BASE_URL = 'https://notes-api.onrender.com/api';

const customFetch = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    mode: 'cors',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getNotes = () => customFetch('/notes');
export const createNote = (note) => customFetch('/notes', {
  method: 'POST',
  body: JSON.stringify(note),
});
