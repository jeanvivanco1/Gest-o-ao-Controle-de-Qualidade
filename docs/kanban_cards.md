# Definição dos Cards do Quadro Kanban (GitHub Projects)

Para cumprir a exigência prática de ter **pelo menos 10 cards** organizados no seu quadro Kanban no GitHub Projects, você deve cadastrar os seguintes itens nas colunas correspondentes:

---

## 🟢 Coluna: Concluído (Done)

### Card 1: Inicialização do Repositório e Dependências
* **Título**: `[CHORE] Inicialização do repositório e setup do package.json`
* **Descrição**: Configurar estrutura básica de arquivos (`/src`, `/tests`, `/docs`), instalar dependências essenciais do Express, Jest para testes unitários, e ESLint para qualidade de código.

### Card 2: Documentação de Escopo e Instruções de Execução
* **Título**: `[DOCS] README inicial com escopo e metodologia`
* **Descrição**: Escrever o arquivo `README.md` detalhando o escopo inicial do produto, os objetivos de negócio para a startup de logística e a escolha da metodologia ágil (Scrumban).

### Card 3: Modelagem Arquitetural (UML)
* **Título**: `[DOCS] Modelagem UML da aplicação`
* **Descrição**: Projetar os diagramas UML (Diagrama de Casos de Uso e Diagrama de Classes) para representar a lógica de negócio do gerenciamento de tarefas de forma conceitual.

### Card 4: Criação do Modelo de Dados Task
* **Título**: `[FEAT] Modelo de Dados Task com Validações`
* **Descrição**: Criar a classe `Task` em `src/models/task.js` encapsulando as regras de validação necessárias (título não vazio, restrição a status predefinidos).

### Card 5: Desenvolvimento da Lógica de Persistência (TaskService)
* **Título**: `[FEAT] Persistência CRUD de Tarefas em arquivo JSON`
* **Descrição**: Implementar a classe `TaskService` em `src/services/taskService.js` para manipulação de arquivos locais do banco de dados simulado (`data/tasks.json`).

### Card 6: Escrita de Testes Unitários de Negócio
* **Título**: `[TEST] Suíte de testes unitários com Jest`
* **Descrição**: Criar e programar testes unitários focados nas validações do modelo `Task` e no funcionamento das operações CRUD no `TaskService`.

### Card 7: Implementação do Servidor Backend e Rotas da API
* **Título**: `[FEAT] Servidor Express e Rotas da API RESTful`
* **Descrição**: Desenvolver as rotas `/api/tasks`, `/api/tasks/:id` e servir a pasta de ativos estáticos da SPA no backend (`src/app.js` e `src/server.js`).

### Card 8: Interface do Usuário Kanban SPA
* **Título**: `[FEAT] Frontend SPA com Design Premium e Responsivo`
* **Descrição**: Implementar os arquivos HTML, CSS (com glassmorphism, dark mode e efeitos modernos) e JS para o quadro Kanban visual com suporte a Drag & Drop e botões de navegação.

### Card 9: Integração Contínua (CI)
* **Título**: `[CHORE] Configuração do Pipeline GitHub Actions`
* **Descrição**: Criar o arquivo `.github/workflows/ci.yml` para rodar automaticamente os testes do Jest e as verificações do linter ESLint em todo push e pull request direcionados à branch `main`.

---

## 🟡 Coluna: Em Progresso (In Progress)

### Card 10: Mudança de Escopo (Campos de Prioridade e Prazo)
* **Título**: `[FEAT] Adicionar Prioridade e Data Limite às tarefas`
* **Descrição**: Atualizar o modelo de dados, o serviço CRUD, o frontend e os testes para suportar o novo requisito da startup de logística: ordenar e classificar tarefas por prioridade (Baixa, Média, Alta) e data de vencimento.

---

## 🔴 Coluna: A Fazer (To Do)

### Card 11: Implementação de Notificações de Vencimento
* **Título**: `[FEAT] Indicação visual de tarefas atrasadas no painel`
* **Descrição**: Destacar visualmente no frontend tarefas cuja data limite (Due Date) seja inferior à data atual, auxiliando a equipe de despacho a visualizar cargas atrasadas.

### Card 12: Geração de Relatório de Desempenho
* **Título**: `[FEAT] Exportar tarefas em formato CSV`
* **Descrição**: Desenvolver uma funcionalidade para baixar as tarefas atuais do Kanban no formato CSV para geração de métricas de desempenho.
