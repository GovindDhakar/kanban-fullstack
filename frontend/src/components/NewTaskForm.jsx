import React, { useState, useEffect } from 'react';

const NewTaskForm = ({ onSave, onClose, initialData = {}, boardId }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [status, setStatus] = useState(initialData.status || 'todo');
  const [subtasks, setSubtasks] = useState(initialData.subtasks || []);

  const addSubtask = () => {
    setSubtasks([...subtasks, { title: '', done: false }]);
  };

  const updateSubtask = (index, value) => {
    const updated = [...subtasks];
    updated[index].title = value;
    setSubtasks(updated);
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave({
      title,
      description,
      status,
      boardId,
      subtasks,
    });
    onClose();
  };

  return (
<div className="overlay">
  <div className="modal">
    <h3>{initialData.id ? 'Edit Task' : 'New Task'}</h3>

    <div className="form-group">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
    </div>

    <div className="form-group">
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
    </div>

    <div className="form-group">
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>


    <div className="form-actions">
      <button onClick={handleSubmit}>Save</button>
      {' '}
      <button onClick={onClose}>Cancel</button>
    </div>
  </div>
</div>
  );
};

export default NewTaskForm;
