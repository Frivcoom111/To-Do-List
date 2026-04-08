# Interface - Documentacao Tecnica

## 1) Stack e Objetivo

Frontend em React + Vite, com roteamento via `react-router-dom` e consumo de API com `axios`.

Objetivo:

- Entregar uma interface web responsiva para autenticacao e gerenciamento de tarefas por usuario.

## 2) Estrutura Atual

Arquivos principais:

- [interface/src/main.jsx](interface/src/main.jsx)
- [interface/src/AppRoutes.jsx](interface/src/AppRoutes.jsx)
- [interface/src/services/api.js](interface/src/services/api.js)
- [interface/src/components/Navbar.jsx](interface/src/components/Navbar.jsx)
- [interface/src/components/TasksList.jsx](interface/src/components/TasksList.jsx)
- [interface/src/components/EmptyState.jsx](interface/src/components/EmptyState.jsx)
- [interface/src/pages/login/LoginPage.jsx](interface/src/pages/login/LoginPage.jsx)
- [interface/src/pages/signup/SignupPage.jsx](interface/src/pages/signup/SignupPage.jsx)
- [interface/src/pages/home/HomePage.jsx](interface/src/pages/home/HomePage.jsx)
- [interface/src/pages/createTask/CreateTaskPage.jsx](interface/src/pages/createTask/CreateTaskPage.jsx)
- [interface/src/pages/tasksDetails/TasksDetails.jsx](interface/src/pages/tasksDetails/TasksDetails.jsx)

Padrao arquitetural:

- `pages` concentram regras de tela e fluxo.
- `components` encapsulam UI reutilizavel.
- `services` centralizam integracao com backend.
- `AppRoutes` controla navegacao e guardas de autenticacao.

## 3) Inicializacao da Aplicacao

Fluxo:

1. [interface/src/main.jsx](interface/src/main.jsx) monta a aplicacao com `BrowserRouter`.
2. [interface/src/AppRoutes.jsx](interface/src/AppRoutes.jsx) registra todas as rotas.
3. Loader global fica sempre montado e e controlado por classe no `body`.

## 4) Navegacao e Guardas de Rota

Definicoes em [interface/src/AppRoutes.jsx](interface/src/AppRoutes.jsx):

- `PublicRoute`:
  - se existir token, redireciona para `/home`.
  - usado em `/` e `/signup`.
- `ProtectedRoute`:
  - sem token, redireciona para `/`.
  - usado em `/home`, `/tasks/new` e `/tasks/:taskId`.

Rotas ativas:

- `GET /` -> Login
- `GET /signup` -> Cadastro
- `GET /home` -> Lista de tarefas
- `GET /tasks/new` -> Criar tarefa
- `GET /tasks/:taskId` -> Detalhes da tarefa

## 5) Camada de API

Configuracao em [interface/src/services/api.js](interface/src/services/api.js):

- `baseURL` por ambiente:
  - `VITE_API_URL` (quando definido)
  - fallback para `http://localhost:3000`
- Interceptor de request:
  - incrementa contador de requisicoes ativas
  - habilita loader global
  - injeta `Authorization: Bearer <token>` em rotas privadas
  - respeita requests publicas com `config.public = true`
- Interceptor de response:
  - decrementa contador e esconde loader quando zera
  - em `401`, remove token do `localStorage`

## 6) Fluxos Funcionais

### 6.1 Login

Tela: [interface/src/pages/login/LoginPage.jsx](interface/src/pages/login/LoginPage.jsx)

- Envia `POST /auth/login` com `email` e `password`.
- Usa request publica (`{ public: true }`).
- Salva `token` no `localStorage`.
- Redireciona para `/home`.
- Exibe mensagem de erro vinda da API quando disponivel.

### 6.2 Cadastro

Tela: [interface/src/pages/signup/SignupPage.jsx](interface/src/pages/signup/SignupPage.jsx)

- Validacoes locais:
  - senha minima de 6 caracteres
  - confirmacao de senha obrigatoria
- Envia `POST /auth/register` com `name`, `email`, `password`.
- Em sucesso, volta para login (`/`).

### 6.3 Home (Listagem)

Tela: [interface/src/pages/home/HomePage.jsx](interface/src/pages/home/HomePage.jsx)

- Carrega tarefas com `GET /task/list`.
- Permite filtro por:
  - `all`
  - `pending`
  - `completed`
- Exibe cards com total e concluidas.
- Remove tarefa com `DELETE /task/delete/:idTask`.
- Exibe `EmptyState` quando lista filtrada estiver vazia.

### 6.4 Criacao de tarefa

Tela: [interface/src/pages/createTask/CreateTaskPage.jsx](interface/src/pages/createTask/CreateTaskPage.jsx)

- Envia `POST /task/create` com:
  - `title`
  - `type`
  - `status` (boolean)
  - `description`
  - `priority`
- Conversao de status no select:
  - `"true" -> true`
  - `"false" -> false`
- Em sucesso, navega para `/home`.

### 6.5 Detalhes e conclusao

Tela: [interface/src/pages/tasksDetails/TasksDetails.jsx](interface/src/pages/tasksDetails/TasksDetails.jsx)

- Busca tarefa por id com `GET /task/list/:id`.
- Marca concluida com `PATCH /task/update/:idTask` enviando `{ status: true }`.
- Exibe feedback visual de sucesso/erro.

### 6.6 Logout

Componente: [interface/src/components/Navbar.jsx](interface/src/components/Navbar.jsx)

- Remove token do `localStorage`.
- Redireciona para `/`.

## 7) Contrato de Integracao com Backend

Base URL local:

- `http://localhost:3000`

Endpoints consumidos no frontend:

- `POST /auth/login`
- `POST /auth/register`
- `GET /task/list`
- `GET /task/list/:id`
- `POST /task/create`
- `PATCH /task/update/:idTask`
- `DELETE /task/delete/:idTask`

Headers:

- Privado: `Authorization: Bearer <token>`

## 8) Dependencias

Arquivo: [interface/package.json](interface/package.json)

Principais:

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `react-hook-form` (instalado, ainda nao utilizado nas telas atuais)
- `zod` (instalado, ainda nao utilizado nas telas atuais)

Scripts:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## 9) Variaveis de Ambiente

Sugestao para `interface/.env`:

- `VITE_API_URL=http://localhost:3000`

Observacao:

- Se `VITE_API_URL` nao for informado, o frontend usa fallback para localhost.

## 10) Pontos Fortes

- Fluxo de autenticacao completo no frontend.
- Rotas protegidas e publicas implementadas.
- Loader global de requisicao com controle por contador.
- UX com estados de lista vazia, feedback de erro e acao rapida para criar tarefa.
- Navegacao SPA com `Link` (sem reload de pagina).

## 11) Riscos e Ajustes Recomendados

### Risco 1: feedback via `alert`

- As telas usam `alert`, o que limita a experiencia e padronizacao visual.

Acao:

- Migrar para toasts/notificacoes visuais centralizadas.

### Risco 2: token no `localStorage`

- Solucao pratica para MVP, mas exposta a riscos de XSS se houver falha na sanitizacao.

Acao:

- Avaliar hardening de seguranca e, em evolucao futura, considerar cookies `httpOnly` com backend adequado.

### Risco 3: validacao de formulario basica

- Validacoes atuais sao manuais em cada tela.

Acao:

- Padronizar com `react-hook-form` + `zod` (ja presentes no projeto).

### Risco 4: padronizacao de erros backend/frontend incompleta

- Frontend ja tenta exibir `error.response.data.message`, mas o backend ainda nao possui middleware global padrao.

Acao:

- Padronizar payload de erro no backend para aumentar previsibilidade no frontend.

## 12) Backlog Tecnico Priorizado

### Prioridade Alta

- [ ] Migrar formularios para `react-hook-form` + `zod`.
- [ ] Implementar sistema de notificacoes (toast) e remover `alert`.
- [ ] Padronizar tratamento de erro em todas as telas.

### Prioridade Media

- [ ] Adicionar estado de carregamento por pagina/componente.
- [ ] Evoluir avatar/perfil no `Navbar` com dados reais do usuario.
- [ ] Adicionar pagina 404 e fallback de rota.

### Prioridade Baixa

- [ ] Adicionar testes de interface (unitarios e e2e).
- [ ] Extrair hooks para fluxo de tarefas e autenticacao.

## 13) Fluxo Resumido de Requisicao no Front

1. Usuario interage com formulario/acao na pagina.
2. Tela chama o client `api`.
3. Interceptor injeta token (se rota privada) e ativa loader.
4. Backend responde com sucesso ou erro.
5. Tela atualiza estado local e UI (lista, detalhe, redirecionamento, feedback).
