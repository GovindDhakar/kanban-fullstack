import React, { useEffect, useState } from 'react';
import { getBoards, createBoard, deleteBoard } from '../apis/boardApi';
import { getTasksByBoardId, createTask, updateTask, deleteTask } from '../apis/taskApi';
import BoardList from '../components/BoardList';
import TaskColumn from '../components/TaskColumn';
import NewBoardForm from '../components/NewBoardForm';
import NewTaskForm from '../components/NewTaskForm';

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadBoards();
  }, []);

  useEffect(() => {
    if (selectedBoardId) loadTasks();
  }, [selectedBoardId]);

  const loadBoards = async () => {
    const data = await getBoards();
    setBoards(data);
    if (data.length) setSelectedBoardId(data[0].id);
  };

  const loadTasks = async () => {
    const data = await getTasksByBoardId(selectedBoardId);
    setTasks(data);
  };

  const handleCreateTask = async (task) => {
    await createTask(task);
    loadTasks();
  };

  const handleUpdateTask = async (task) => {
    console.log(task)
    await updateTask(task.id, task);
    loadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleDeleteBoard = async (id) => {
    console.log(id)
    await deleteBoard(id);
    loadBoards();
  };

  return (
    <div className="app">
      <div className="sidebar">
        <BoardList boards={boards} setSelectedBoardId={setSelectedBoardId} onDelete={handleDeleteBoard} />
        <NewBoardForm onCreate={async (name) => {
          await createBoard(name);
          loadBoards();
        }} />
      </div>
      <div className="board-content">
      <h2>{boards.find(b => b.id === selectedBoardId)?.name || 'Select a Board'}</h2>
        <button onClick={() => setEditingTask({})}>+ New Task</button>
        <div className="columns">
          {['todo', 'in-progress', 'done'].map(status => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter(t => t.status === status)}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </div>
      {editingTask && (
        <NewTaskForm
          boardId={selectedBoardId}
          initialData={editingTask}
          onSave={(task) => {
            if (editingTask && editingTask.id) {
                handleUpdateTask({ ...editingTask, ...task });
             } else {
                 handleCreateTask(task);
                }
            }}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
