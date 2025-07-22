import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const completed = task.subtasks?.filter(s => s.done).length || 0;
  const total = task.subtasks?.length || 0;

  return (
    <div className="task-card">
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <button onClick={() => onEdit(task)}>✏️</button>
      {' '}
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </div>
  );
};

export default TaskCard;
