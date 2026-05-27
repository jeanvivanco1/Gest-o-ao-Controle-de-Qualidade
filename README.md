# TechFlow Tasks: Sistema de Gerenciamento de Tarefas Ágeis

Este repositório contém a implementação prática do desafio de Engenharia de Software da **TechFlow Solutions**, desenvolvendo um sistema básico de gerenciamento de tarefas sob metodologias ágeis para uma startup de logística.

## 🎯 Objetivo do Projeto
Desenvolver uma ferramenta web visual, interativa e ágil que permita acompanhar o fluxo de trabalho em tempo real, priorizar tarefas e otimizar a distribuição do trabalho entre a equipe de logística.

---

## 🛠️ Escopo Inicial do Sistema
O sistema básico consiste em:
- **Painel Kanban**: Visualização em colunas das tarefas nos estados:
  - `A Fazer` (To Do)
  - `Em Progresso` (In Progress)
  - `Concluído` (Done)
- **Operações CRUD**:
  - Criar tarefas (com título e descrição).
  - Listar tarefas em tempo real.
  - Atualizar o status da tarefa (arrastando ou alternando estado).
  - Excluir tarefas do painel.

---

## 🚀 Metodologia Adotada
O projeto foi planejado e executado utilizando a abordagem **Scrumban** (uma fusão de Scrum e Kanban):
1. **Scrum (Planejamento e Iteração)**: Divisão de ciclos em iterações de 1 semana, com rituais rápidos de Daily Standup simulados e retrospectivas ao final.
2. **Kanban (Fluxo de Trabalho)**: Utilização de um quadro visual com colunas e limitação de trabalho em progresso (WIP) para evitar gargalos nas operações logísticas.

---

## 🔧 Como Executar o Projeto

### Pré-requisitos
Você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)

### Instalação
1. Clone o repositório ou navegue até o diretório do projeto:
   ```bash
   cd techflow-tasks
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

### Executando a Aplicação
1. Inicie o servidor local:
   ```bash
   npm start
   ```
2. Acesse no seu navegador: `http://localhost:3000`

### Executando Testes
1. Para rodar a suíte de testes unitários:
   ```bash
   npm test
   ```
2. Para rodar o linter (qualidade do código):
   ```bash
   npm run lint
   ```
