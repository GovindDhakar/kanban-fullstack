const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getBoards = async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const newBoard = await prisma.board.create({ data: { name } });
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create board' });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedBoard = await prisma.board.update({
      where: { id: Number(req.params.id) },
      data: { name },
    });
    res.json(updatedBoard);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update board' });
  }
};

exports.deleteBoard = async (req, res) => {
  const boardId = Number(req.params.id);

  try {
    await prisma.task.deleteMany({
      where: { boardId }
    });

    await prisma.board.delete({
      where: { id: boardId }
    });

    res.json({ message: 'Board deleted' });
  } catch (error) {
    console.error('Delete Board Error:', error);
    res.status(400).json({ error: 'Failed to delete board' });
  }
};
