const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📋 Kanban e CRUD de tarefas da TechFlow Solutions ativo`);
  console.log(`===================================================`);
});
