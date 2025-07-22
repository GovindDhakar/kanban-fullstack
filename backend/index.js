require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { PrismaClient } = require('@prisma/client');

const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Kanban Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
