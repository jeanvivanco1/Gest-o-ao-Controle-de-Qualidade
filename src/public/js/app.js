/* eslint-disable no-unused-vars */
// ==========================================
// Frontend Logic - TechFlow Tasks
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();
});

// Cache local de tarefas
let localTasks = [];

// Função para buscar tarefas da API
async function fetchTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    
    localTasks = await response.json();
    renderBoard();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar o quadro Kanban. Tente novamente mais tarde.');
  }
}

// Renderiza o quadro Kanban e distribui as tarefas pelas colunas
function renderBoard() {
  const todoList = document.getElementById('list-todo');
  const progressList = document.getElementById('list-inprogress');
  const doneList = document.getElementById('list-done');

  // Limpa as listas
  todoList.innerHTML = '';
  progressList.innerHTML = '';
  doneList.innerHTML = '';

  let todoCount = 0;
  let progressCount = 0;
  let doneCount = 0;

  localTasks.forEach(task => {
    const card = createTaskCard(task);
    
    if (task.status === 'A Fazer') {
      todoList.appendChild(card);
      todoCount++;
    } else if (task.status === 'Em Progresso') {
      progressList.appendChild(card);
      progressCount++;
    } else if (task.status === 'Concluído') {
      doneList.appendChild(card);
      doneCount++;
    }
  });

  // Atualiza contadores
  document.getElementById('count-todo').innerText = todoCount;
  document.getElementById('count-inprogress').innerText = progressCount;
  document.getElementById('count-done').innerText = doneCount;
}

// Cria o elemento HTML da Task Card
function createTaskCard(task) {
  const card = document.createElement('div');
  card.className = `task-card ${getStatusClass(task.status)}`;
  card.draggable = true;
  card.id = `task-${task.id}`;
  
  // Handlers para Drag e Drop
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', task.id);
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });

  // Validação e formatação de data limite (Due Date)
  let dueDateHTML = '';
  if (task.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const limitDate = new Date(task.dueDate + 'T00:00:00'); // Garante fuso horário local
    const isOverdue = limitDate < today && task.status !== 'Concluído';
    
    const formattedDueDate = limitDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });

    if (isOverdue) {
      dueDateHTML = `<span class="card-date overdue" title="Tarefa atrasada!">⚠️ Prazo: ${formattedDueDate}</span>`;
    } else {
      dueDateHTML = `<span class="card-date">📅 Prazo: ${formattedDueDate}</span>`;
    }
  } else {
    // Se não tiver prazo limite, exibe a data de criação
    const createdFormatted = new Date(task.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
    dueDateHTML = `<span class="card-date">Criado: ${createdFormatted}</span>`;
  }

  const priorityClass = (task.priority || 'Média').toLowerCase().replace('é', 'e');

  card.innerHTML = `
    <div class="card-header-row">
      <h4 class="card-title">${escapeHTML(task.title)}</h4>
      <span class="priority-badge ${priorityClass}">${escapeHTML(task.priority || 'Média')}</span>
    </div>
    <p class="card-desc">${escapeHTML(task.description || 'Sem descrição.')}</p>
    <div class="card-footer">
      ${dueDateHTML}
      <div class="card-actions">
        ${getNavigationButtonsHTML(task)}
        <button class="btn-icon-only btn-delete" onclick="deleteTask('${task.id}')" title="Excluir">🗑️</button>
      </div>
    </div>
  `;

  return card;
}

// Retorna botões rápidos para mudar de coluna (melhora acessibilidade e mobile)
function getNavigationButtonsHTML(task) {
  let buttons = '';
  if (task.status === 'A Fazer') {
    buttons += `<button class="btn-icon-only" onclick="updateTaskStatus('${task.id}', 'Em Progresso')" title="Mover para Em Progresso">➡️</button>`;
  } else if (task.status === 'Em Progresso') {
    buttons += `<button class="btn-icon-only" onclick="updateTaskStatus('${task.id}', 'A Fazer')" title="Mover para A Fazer">⬅️</button>`;
    buttons += `<button class="btn-icon-only" onclick="updateTaskStatus('${task.id}', 'Concluído')" title="Mover para Concluído">➡️</button>`;
  } else if (task.status === 'Concluído') {
    buttons += `<button class="btn-icon-only" onclick="updateTaskStatus('${task.id}', 'Em Progresso')" title="Mover para Em Progresso">⬅️</button>`;
  }
  return buttons;
}

function getStatusClass(status) {
  if (status === 'A Fazer') return 'todo';
  if (status === 'Em Progresso') return 'inprogress';
  if (status === 'Concluído') return 'done';
  return '';
}

// Salva ou edita uma tarefa
async function saveTask(event) {
  event.preventDefault();
  
  const id = document.getElementById('task-id').value;
  const title = document.getElementById('input-title').value;
  const description = document.getElementById('input-desc').value;
  const priority = document.getElementById('input-priority').value;
  const dueDate = document.getElementById('input-duedate').value || null;

  const payload = { title, description, priority, dueDate };

  try {
    let response;
    if (id) {
      // Atualização (não usado pelo formulário básico por enquanto, mas implementado na API)
      response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      // Criação
      response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao salvar tarefa');
    }

    closeModal();
    fetchTasks();
  } catch (error) {
    alert(error.message);
  }
}

// Atualiza o status de uma tarefa
async function updateTaskStatus(id, newStatus) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });

    if (!response.ok) throw new Error('Erro ao atualizar status');
    
    fetchTasks();
  } catch (error) {
    alert(error.message);
  }
}

// Exclui uma tarefa
async function deleteTask(id) {
  if (!confirm('Deseja realmente excluir esta tarefa logística?')) return;

  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Erro ao excluir tarefa');

    fetchTasks();
  } catch (error) {
    alert(error.message);
  }
}

// Modais
function openModal() {
  document.getElementById('task-form').reset();
  document.getElementById('task-id').value = '';
  document.getElementById('modal-title').innerText = 'Nova Tarefa Logística';
  document.getElementById('task-modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('task-modal').style.display = 'none';
}

// Drag & Drop Handlers
function allowDrop(event) {
  event.preventDefault();
  const list = event.currentTarget;
  list.classList.add('drag-over');
}

document.querySelectorAll('.task-list').forEach(list => {
  list.addEventListener('dragleave', () => {
    list.classList.remove('drag-over');
  });
});

function handleDrop(event, newStatus) {
  event.preventDefault();
  const list = event.currentTarget;
  list.classList.remove('drag-over');
  
  const id = event.dataTransfer.getData('text/plain');
  if (id) {
    updateTaskStatus(id, newStatus);
  }
}

// Auxiliar para evitar injeção de HTML
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
