# Manager Task

Full-stack To-Do List application for creating, managing, and tracking personal tasks with user authentication.

## Tech Stack

### Backend
- **Node.js** (ES Modules) + **Express** — API RESTful
- **PostgreSQL** (`pg`) — banco de dados relacional
- **bcrypt** — criptografia de senhas
- **jsonwebtoken** (JWT) — autenticação via token Bearer
- **cors** — compartilhamento entre origens
- **dotenv** — variáveis de ambiente

### Frontend
- **React 19** + **Vite** — interface moderna e rápida
- **React Router DOM** — roteamento do lado do cliente
- **Axios** — requisições HTTP com interceptors (loading + token)
- **React Hook Form** — controle de formulários
- **Zod** — validação de dados

---

## Project Structure

```
To-Do-List/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Conexão com PostgreSQL
│   │   ├── controllers/
│   │   │   ├── authController.js    # Login e registro
│   │   │   └── taskController.js    # CRUD de tarefas
│   │   ├── middlewares/
│   │   │   └── authMiddlewares.js   # Validação de JWT
│   │   ├── models/
│   │   │   ├── TaskModel.js         # Queries de tasks
│   │   │   └── UserModel.js         # Queries de users
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Rotas /auth/*
│   │   │   └── taskRoutes.js        # Rotas /task/* (autenticadas)
│   │   ├── services/
│   │   │   ├── authService.js       # Lógica de auth (hash + token)
│   │   │   └── taskService.js       # Lógica de tasks (validação de dono)
│   │   └── app.js                   # App Express + rotas + CORS
│   └── server.js
├── interface/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmptyState.jsx        # Estado vazio com CTA
│   │   │   ├── Navbar.jsx            # Barra lateral de navegação
│   │   │   └── TasksList.jsx         # Lista de tarefas com ações
│   │   ├── pages/
│   │   │   ├── login/LoginPage.jsx
│   │   │   ├── signup/SignupPage.jsx
│   │   │   ├── home/HomePage.jsx     # Dashboard principal
│   │   │   ├── createTask/CreateTaskPage.jsx
│   │   │   └── tasksDetails/TasksDetails.jsx
│   │   ├── services/
│   │   │   └── api.js                # Axios com interceptors
│   │   ├── AppRoutes.jsx             # Rotas da aplicação
│   │   ├── main.jsx                  # Entry point React
│   │   └── index.css                 # Estilos globais
│   └── vite.config.js
```

---

## Prerequisites

- **Node.js** >= 18
- **PostgreSQL** >= 14

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd To-Do-List
```

### 2. Set up the database

No PostgreSQL, crie o banco e as tabelas:

```sql
CREATE DATABASE manage_task;
```

```sql
-- Tabela de usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tarefas
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title VARCHAR(150) NOT NULL,
  type VARCHAR(50),
  status BOOLEAN DEFAULT false,
  description TEXT,
  priority VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configure environment variables

Crie um arquivo `.env` na pasta `backend/`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=manage_task
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

### 4. Install dependencies and start

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (em outro terminal)
cd interface
npm install
npm run dev
```

O backend roda em `http://localhost:3000` e o frontend em `http://localhost:5173`.

---

## API Documentation

### Auth Routes (públicas)

| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| POST   | `/auth/register`  | Cria novo usuário        |
| POST   | `/auth/login`     | Autentica e retorna token |

#### POST /auth/register

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "message": "Usuário criado com sucesso.",
  "user": { "id": 1, "name": "...", "email": "..." }
}
```

#### POST /auth/login

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "message": "Logado com sucesso.",
  "token": "eyJhbGci..."
}
```

### Task Routes (autenticadas com Bearer Token)

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| POST   | `/task/create`          | Cria nova tarefa             |
| GET    | `/task/list`            | Lista todas as tarefas do user |
| DELETE | `/task/delete/:idTask`  | Deleta uma tarefa            |
| PATCH  | `/task/update/:idTask`  | Atualiza status da tarefa    |

**Header obrigatório:**
```
Authorization: Bearer <token>
```

#### POST /task/create

**Body:**
```json
{
  "title": "string",
  "type": "string",
  "status": false,
  "description": "string",
  "priority": "string"
}
```

**Response (201):**
```json
{
  "message": "Tarefa criado com sucesso.",
  "task": { "id": 1, "title": "...", "status": false, ... }
}
```

#### GET /task/list

**Response (200):**
```json
{
  "message": "Tarefas listadas com sucesso.",
  "tasks": [
    { "id": 1, "title": "...", "status": false, "priority": "...", ... }
  ]
}
```

#### DELETE /task/delete/:idTask

**Response (200):**
```json
{
  "message": "Tarefa deletada com sucesso!",
  "deletedTask": { ... }
}
```

#### PATCH /task/update/:idTask

**Body:**
```json
{
  "status": true
}
```

**Response (200):**
```json
{
  "message": "Tarefa atualizada com sucesso!"
}
```

**Error (401) — Token inválido:**
```json
{
  "message": "Token inválido ou expirado."
}
```

---

## Frontend Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | LoginPage | Público |
| `/signup` | SignupPage | Público |
| `/home` | HomePage (Dashboard) | Privado |
| `/tasks/new` | CreateTaskPage | Privado |
| `/tasks/:taskId` | TasksDetailsPage | Privado |

---

## Architecture

### Backend (MVC-like)

O backend segue uma arquitetura em camadas:

1. **Routes** — definem os endpoints e mapeiam para controllers
2. **Controllers** — recebem requests, validam dados e retornam responses
3. **Services** — contêm a regra de negócio (hash de senha, verificação de dono da tarefa, geração de token JWT)
4. **Models** — encapsulam queries SQL e comunicação com o banco
5. **Middlewares** — interceptam requests para autenticar o usuário via JWT

O fluxo de autenticação: o usuário faz login, recebe um JWT no response, e esse token é enviado no `Authorization` header em todas as requisições subsequentes. O middleware `auth` valida o token e anexa `request.userId` antes de prosseguir para a rota protegida.

### Frontend

O frontend usa **Axios interceptors** para injetar automaticamente o token JWT em todas as requests e exibir um indicador global de loading. O roteamento é protegido — o token é salvo no `localStorage` após o login e removido em caso de erro 401 (sessão expirada).

---

## Available Scripts

### Backend
```bash
npm run dev    # Inicia servidor com nodemon (hot reload)
```

### Frontend
```bash
npm run dev      # Inicia Vite dev server
npm run dev:clean # Inicia Vite forçando cache limpo
npm run build    # Gera build de produção
npm run preview  # Preview do build de produção
npm run lint     # Roda ESLint
```

---

## Author

Carlos Eduardo Tolentino Faustino dos Santos
