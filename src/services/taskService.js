const fs = require('fs');
const path = require('path');
const Task = require('../models/task');

class TaskService {
  constructor(filePath) {
    this.filePath = filePath || path.join(__dirname, '../../data/tasks.json');
    this.ensureDirectoryExistence();
  }

  // Garante que o diretório e o arquivo JSON de dados existam
  ensureDirectoryExistence() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf-8');
    }
  }

  // Lê todas as tarefas do arquivo
  getAllTasks() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      const rawTasks = JSON.parse(data);
      return rawTasks.map(t => new Task(t));
    } catch (error) {
      return [];
    }
  }

  // Salva as tarefas no arquivo
  saveTasks(tasks) {
    fs.writeFileSync(this.filePath, JSON.stringify(tasks.map(t => t.toJSON()), null, 2), 'utf-8');
  }

  // Cria uma nova tarefa
  createTask(taskData) {
    const task = new Task(taskData);
    task.validate();
    
    const tasks = this.getAllTasks();
    tasks.push(task);
    this.saveTasks(tasks);
    
    return task;
  }

  // Busca uma tarefa pelo ID
  getTaskById(id) {
    const tasks = this.getAllTasks();
    return tasks.find(t => t.id === id);
  }

  // Atualiza uma tarefa
  updateTask(id, updateData) {
    const tasks = this.getAllTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Tarefa não encontrada.');
    }

    // Mescla dados atuais com atualizações
    const updatedTaskData = {
      ...tasks[index].toJSON(),
      ...updateData,
      id // Mantém o ID original invariável
    };

    const updatedTask = new Task(updatedTaskData);
    updatedTask.validate();

    tasks[index] = updatedTask;
    this.saveTasks(tasks);

    return updatedTask;
  }

  // Remove uma tarefa
  deleteTask(id) {
    const tasks = this.getAllTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Tarefa não encontrada.');
    }

    tasks.splice(index, 1);
    this.saveTasks(tasks);
    return true;
  }
}

module.exports = TaskService;
