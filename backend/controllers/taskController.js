const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTasksByBoard = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { boardId: Number(req.params.boardId) },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, boardId } = req.body;
    const newTask = await prisma.task.create({
      data: { title, description, status, boardId },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id: Number(req.params.id) },
      data: { title, description, status },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await prisma.task.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
};
