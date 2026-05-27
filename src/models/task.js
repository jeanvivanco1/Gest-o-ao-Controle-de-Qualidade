class Task {
  constructor({ id, title, description, status, priority, dueDate, createdAt }) {
    this.id = id || Math.random().toString(36).substring(2, 11);
    this.title = title;
    this.description = description || '';
    this.status = status || 'A Fazer'; // Padrão: A Fazer
    this.priority = priority || 'Média'; // Padrão: Média (Baixa, Média, Alta)
    this.dueDate = dueDate || null; // Formato YYYY-MM-DD ou null
    this.createdAt = createdAt || new Date().toISOString();
  }

  // Validação dos dados da tarefa
  validate() {
    if (!this.title || typeof this.title !== 'string' || this.title.trim() === '') {
      throw new Error('O título da tarefa é obrigatório e deve ser uma string válida.');
    }
    
    const validStatuses = ['A Fazer', 'Em Progresso', 'Concluído'];
    if (!validStatuses.includes(this.status)) {
      throw new Error(`Status inválido. Deve ser um de: ${validStatuses.join(', ')}.`);
    }

    const validPriorities = ['Baixa', 'Média', 'Alta'];
    if (!validPriorities.includes(this.priority)) {
      throw new Error(`Prioridade inválida. Deve ser uma de: ${validPriorities.join(', ')}.`);
    }

    if (this.dueDate && isNaN(Date.parse(this.dueDate))) {
      throw new Error('A data limite (dueDate) inserida é inválida.');
    }

    return true;
  }

  // Método auxiliar para exportar dados limpos
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      dueDate: this.dueDate,
      createdAt: this.createdAt
    };
  }
}

module.exports = Task;
