const API = 'http://localhost:8000/api/tasks';

export const getTasksByBoardId = async (boardId) => {
  const res = await fetch(`${API}/${boardId}`);
  return res.json();
};

export const createTask = async (task) => {
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
};

export const updateTask = async (id, task) => {
  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (id) => {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
};
