const path = require('path');
const fs = require('fs');
const Task = require('../src/models/task');
const TaskService = require('../src/services/taskService');

const testFilePath = path.join(__dirname, '../data/tasks_test.json');

describe('Task Model', () => {
  test('Deve instanciar uma tarefa válida com valores padrão', () => {
    const task = new Task({ title: 'Testar aplicação' });
    expect(task.id).toBeDefined();
    expect(task.title).toBe('Testar aplicação');
    expect(task.description).toBe('');
    expect(task.status).toBe('A Fazer');
    expect(task.createdAt).toBeDefined();
    expect(task.validate()).toBe(true);
  });

  test('Deve lançar erro ao validar tarefa sem título', () => {
    const task = new Task({ title: '' });
    expect(() => task.validate()).toThrow('O título da tarefa é obrigatório');
  });

  test('Deve lançar erro ao validar tarefa com status inválido', () => {
    const task = new Task({ title: 'Tarefa', status: 'Cancelada' });
    expect(() => task.validate()).toThrow('Status inválido');
  });
});

describe('Task Service', () => {
  let service;

  beforeEach(() => {
    // Inicializa o serviço com arquivo temporário de testes
    service = new TaskService(testFilePath);
  });

  afterEach(() => {
    // Remove o arquivo de testes temporário
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  test('Deve criar e recuperar uma tarefa', () => {
    const newTask = service.createTask({
      title: 'Tarefa Teste CRUD',
      description: 'Testando fluxo básico'
    });

    expect(newTask.id).toBeDefined();
    expect(newTask.title).toBe('Tarefa Teste CRUD');

    const tasks = service.getAllTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Tarefa Teste CRUD');
  });

  test('Deve atualizar o status de uma tarefa existente', () => {
    const task = service.createTask({ title: 'Tarefa para atualização' });
    const updated = service.updateTask(task.id, { status: 'Em Progresso' });

    expect(updated.status).toBe('Em Progresso');

    const fetched = service.getTaskById(task.id);
    expect(fetched.status).toBe('Em Progresso');
  });

  test('Deve excluir uma tarefa com sucesso', () => {
    const task = service.createTask({ title: 'Tarefa para exclusão' });
    const deleted = service.deleteTask(task.id);
    
    expect(deleted).toBe(true);
    expect(service.getAllTasks().length).toBe(0);
  });

  test('Deve falhar ao atualizar tarefa não existente', () => {
    expect(() => service.updateTask('invalido-id', { status: 'Em Progresso' })).toThrow('Tarefa não encontrada.');
  });
});
