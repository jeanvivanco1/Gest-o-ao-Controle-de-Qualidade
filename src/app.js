const express = require('express');
const path = require('path');
const TaskService = require('./services/taskService');

const app = express();
const taskService = new TaskService();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API REST

// Listar todas as tarefas
app.get('/api/tasks', (req, res) => {
  try {
    const tasks = taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
});

// Criar nova tarefa
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = taskService.createTask({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualizar tarefa
app.put('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedTask = taskService.updateTask(id, updates);
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Excluir tarefa
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    taskService.deleteTask(id);
    res.json({ success: true, message: 'Tarefa excluída com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
