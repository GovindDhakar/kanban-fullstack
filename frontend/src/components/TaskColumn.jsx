import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, onEdit, onDelete }) => {
  return (
    <div className="column">
      <h4>{status.toUpperCase()}</h4>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskColumn;
