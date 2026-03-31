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
- Tela de login criada (UI pronta), mas ainda sem integracao com API.

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

- [ ] Conectar formulario de login ao endpoint `/auth/login`.
- [ ] Salvar token no `localStorage`.
- [ ] Tratar mensagens de erro (credenciais invalidas, servidor offline).
- [ ] Redirecionar para tela de tarefas apos login.

### Fase 2 - Tela de Cadastro

- [ ] Criar pagina de registro.
- [ ] Integrar com `/auth/register`.
- [ ] Validacoes de formulario (email valido, senha minima).

### Fase 3 - Modulo de Tarefas

- [ ] Listagem de tarefas apos login.
- [ ] Criacao de nova tarefa.
- [ ] Alteracao de status (concluida/pendente).
- [ ] Exclusao de tarefa.

### Fase 4 - Qualidade e UX

- [ ] Loading states e feedback visual.
- [ ] Empty states (sem tarefas).
- [ ] Refino de layout responsivo.
- [ ] Padronizar mensagens de erro backend/frontend.

## 9) Criterios de Pronto (Definition of Done)

- [ ] Funcionalidade implementada no frontend.
- [ ] Endpoint correspondente funcionando no backend.
- [ ] Fluxo testado manualmente (sucesso + erro).
- [ ] Validacoes minimas aplicadas.
- [ ] Sem erros de lint/build.

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

Implementar fluxo completo de autenticacao no frontend:

1. Login chama API.
2. Token salvo localmente.
3. Rota protegida para pagina de tarefas.
4. Botao de logout removendo token.


<div class="loader">Carregando...</div>

/* Esconde o loading por padrão */
.loader {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
}

/* Quando tiver a classe 'loading', mostra */
body.loading .loader {
  display: block;
}

/* Spinner girando (opcional) */
.loader::after {
  content: "⏳";
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}