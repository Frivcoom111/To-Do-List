# To-Do List - Specs do Projeto

## 1) Visao do Produto

Aplicacao web de gerenciamento de tarefas com autenticacao por JWT.
Cada usuario acessa apenas suas proprias tarefas e pode criar, listar, atualizar status e remover itens.

Objetivo:

- Ajudar o usuario a organizar tarefas do dia a dia de forma simples e rapida.

Publico-alvo:

- Estudantes e profissionais que precisam acompanhar tarefas por prioridade e status.

## 2) Estado Atual (baseado no codigo)

Backend pronto com:

- Cadastro e login de usuario.
- Geracao e validacao de token JWT.
- CRUD parcial de tarefas (create, list, delete, update status).
- Banco PostgreSQL via `pg` usando `DATABASE_URL`.

Frontend atual:

- Aplicacao React + Vite.
- Fluxo de autenticacao integrado (login, cadastro, logout, token no localStorage).
- Rotas protegidas para modulo de tarefas.
- Modulo de tarefas integrado (listagem, criacao, exclusao, detalhe e update de status).

## 3) Requisitos Funcionais

### RF-01 Cadastro

- Usuario deve conseguir criar conta com nome, email e senha.
- Email deve ser unico.

### RF-02 Login

- Usuario deve conseguir autenticar com email e senha.
- Sistema deve retornar token JWT valido por 1 dia.

### RF-03 Criar tarefa

- Usuario autenticado cria tarefa com:
  - title (string)
  - type (string)
  - status (boolean)
  - description (string)
  - priority (string)

### RF-04 Listar tarefas

- Usuario autenticado visualiza apenas tarefas do proprio usuario.

### RF-05 Atualizar status

- Usuario autenticado altera apenas o campo status da propria tarefa.

### RF-06 Excluir tarefa

- Usuario autenticado exclui apenas tarefa que pertence a ele.

## 4) Requisitos Nao Funcionais

- RNF-01 Seguranca: senha armazenada com hash (bcrypt).
- RNF-02 Seguranca: endpoints de tarefas protegidos com Bearer token.
- RNF-03 Performance: respostas de API em formato JSON com status HTTP coerente.
- RNF-04 Organizacao: arquitetura em camadas (routes -> controllers -> services -> models).
- RNF-05 UX: interface responsiva para desktop e mobile.

## 5) Regras de Negocio

- RN-01 Nao permitir cadastro com email ja existente.
- RN-02 Nao permitir operacoes de tarefa sem token.
- RN-03 Nao permitir alterar/excluir tarefa de outro usuario.
- RN-04 Campos obrigatorios devem ser validados no backend.

## 6) Contrato de API (MVP)

Base URL backend: `http://localhost:3000`

### Auth

- POST `/auth/register`
  - Body: `{ "name": "...", "email": "...", "password": "..." }`
  - 201: usuario criado

- POST `/auth/login`
  - Body: `{ "email": "...", "password": "..." }`
  - 200: `{ "token": "..." }`

### Tasks (requer Authorization: Bearer <token>)

- POST `/task/create`
  - Body: `{ "title", "type", "status", "description", "priority" }`

- GET `/task/list`
  - Retorna lista de tarefas do usuario autenticado.

- GET `/task/list/:id`
  - Retorna detalhe de uma tarefa do usuario autenticado.

- PATCH `/task/update/:idTask`
  - Body: `{ "status": true|false }`

- DELETE `/task/delete/:idTask`

## 7) Modelo de Dados (PostgreSQL)

### users

- id (PK)
- name
- email (UNIQUE)
- password (hash)

### tasks

- id (PK)
- user_id (FK -> users.id)
- title
- type
- status (boolean)
- description
- priority

## 8) Roadmap de Implementacao

### Fase 1 - Integracao de Login no Front

- [x] Conectar formulario de login ao endpoint `/auth/login`.
- [x] Salvar token no `localStorage`.
- [x] Tratar mensagens de erro (credenciais invalidas, servidor offline).
- [x] Redirecionar para tela de tarefas apos login.

### Fase 2 - Tela de Cadastro

- [x] Criar pagina de registro.
- [x] Integrar com `/auth/register`.
- [x] Validacoes de formulario (email valido, senha minima).

### Fase 3 - Modulo de Tarefas

- [x] Listagem de tarefas apos login.
- [x] Criacao de nova tarefa.
- [x] Alteracao de status (concluida/pendente).
- [x] Exclusao de tarefa.

### Fase 4 - Qualidade e UX

- [x] Loading states e feedback visual.
- [x] Empty states (sem tarefas).
- [x] Refino de layout responsivo.
- [~] Padronizar mensagens de erro backend/frontend (frontend ajustado; backend ainda sem middleware global).

## 9) Criterios de Pronto (Definition of Done)

- [x] Funcionalidade implementada no frontend.
- [x] Endpoint correspondente funcionando no backend.
- [x] Fluxo testado manualmente (sucesso + erro).
- [x] Validacoes minimas aplicadas.
- [x] Sem erros de lint/build.

## 10) Riscos Tecnicos Atuais

- Falta middleware global de tratamento de erros no backend para padronizar respostas.
- Nao existe documentacao de variaveis de ambiente no projeto.
- Nao ha testes automatizados (somente validacao manual no momento).

## 11) Variaveis de Ambiente Esperadas

Backend (`backend/.env`):

- `PORT=3000`
- `DATABASE_URL=postgres://...`
- `JWT_SECRET=...`

## 12) Proxima Entrega Sugerida

Concluir padronizacao de erros no backend:

1. Adicionar middleware global de erro em `backend/src/app.js`.
2. Ajustar codigos HTTP para 400/401/403/404 conforme regra de negocio.
3. Definir formato unico de resposta de erro (`message`, `code`, `details`).
4. Revisar mensagens de erro para melhorar UX no frontend.
