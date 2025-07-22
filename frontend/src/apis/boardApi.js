const API = 'http://localhost:8000/api/boards';

export const getBoards = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createBoard = async (name) => {
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
};

export const deleteBoard = async (id) => {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
};
