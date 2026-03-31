# Backend - Documentacao Tecnica

## 1) Stack e Objetivo

Backend em Node.js com Express, PostgreSQL (`pg`), autenticacao JWT e hash de senha com bcrypt.

Objetivo:

- Expor API para autenticacao de usuarios e gerenciamento de tarefas por usuario.

## 2) Estrutura Atual

Arquivos principais:

- [backend/server.js](backend/server.js)
- [backend/src/app.js](backend/src/app.js)
- [backend/src/config/database.js](backend/src/config/database.js)
- [backend/src/middlewares/authMiddlewares.js](backend/src/middlewares/authMiddlewares.js)
- [backend/src/routes/authRoutes.js](backend/src/routes/authRoutes.js)
- [backend/src/routes/taskRoutes.js](backend/src/routes/taskRoutes.js)
- [backend/src/controllers/authController.js](backend/src/controllers/authController.js)
- [backend/src/controllers/taskController.js](backend/src/controllers/taskController.js)
- [backend/src/services/authService.js](backend/src/services/authService.js)
- [backend/src/services/taskService.js](backend/src/services/taskService.js)
- [backend/src/models/UserModel.js](backend/src/models/UserModel.js)
- [backend/src/models/TaskModel.js](backend/src/models/TaskModel.js)
- [backend/src/utils/generateHashPassword.js](backend/src/utils/generateHashPassword.js)
- [backend/src/utils/compareHashPassword.js](backend/src/utils/compareHashPassword.js)
- [backend/src/utils/generateToken.js](backend/src/utils/generateToken.js)

Padrao arquitetural:

- `routes` recebem requisicoes.
- `controllers` orquestram entrada/saida HTTP.
- `services` concentram regras de negocio.
- `models` fazem acesso ao banco com SQL.
- `utils` encapsulam hash/token.

## 3) Inicializacao da Aplicacao

Fluxo:

1. [backend/server.js](backend/server.js) carrega variaveis de ambiente.
2. Executa `connectDatabase()` para validar conexao no PostgreSQL.
3. Sobe servidor Express na porta configurada.

Em [backend/src/app.js](backend/src/app.js):

- `express.json()` habilitado.
- `cors()` habilitado globalmente.
- Rotas publicas em `/auth`.
- Rotas privadas em `/task`, protegidas por middleware `auth`.

## 4) Banco de Dados

Configuracao em [backend/src/config/database.js](backend/src/config/database.js):

- Cliente `Pool` do pacote `pg`.
- Conexao por `DATABASE_URL`.
- SSL ativo com `rejectUnauthorized: false`.

Observacao:

- Esse SSL e comum para provedores cloud, mas em ambiente local pode exigir ajuste conforme seu banco.

## 5) Autenticacao e Autorizacao

### Login e Registro

Regras em [backend/src/services/authService.js](backend/src/services/authService.js):

- Registro:
  - valida campos obrigatorios.
  - valida email unico.
  - gera hash da senha com bcrypt.
  - cria usuario no banco.
- Login:
  - valida campos obrigatorios.
  - valida existencia do usuario.
  - compara senha com hash.
  - gera token JWT com validade de 1 dia.

Utils:

- Hash: [backend/src/utils/generateHashPassword.js](backend/src/utils/generateHashPassword.js)
- Compare: [backend/src/utils/compareHashPassword.js](backend/src/utils/compareHashPassword.js)
- Token: [backend/src/utils/generateToken.js](backend/src/utils/generateToken.js)

### Middleware de rota privada

Em [backend/src/middlewares/authMiddlewares.js](backend/src/middlewares/authMiddlewares.js):

- Lê header `Authorization`.
- Remove prefixo `Bearer `.
- Valida token com `JWT_SECRET`.
- Injeta `request.userId` para uso nas rotas de tarefa.

## 6) Modulo de Tarefas

Regras em [backend/src/services/taskService.js](backend/src/services/taskService.js):

- `create`:
  - valida campos obrigatorios (incluindo `status` boolean com funcao `isDefined`).
  - cria tarefa vinculada ao `userId` autenticado.
- `listById`:
  - valida se usuario existe.
  - retorna tarefas do usuario.
- `delete`:
  - valida existencia da tarefa.
  - valida ownership (`task.user_id == userId`).
  - remove tarefa.
- `updateStatus`:
  - valida `status` informado.
  - valida existencia da tarefa.
  - valida ownership.
  - atualiza apenas status.

Persistencia em [backend/src/models/TaskModel.js](backend/src/models/TaskModel.js):

- `create`
- `findByUserId`
- `findTaskById`
- `delete`
- `updateStatus`

## 7) Contrato de Endpoints

Base URL sugerida local: `http://localhost:3000`

### Auth (publico)

- `POST /auth/register`
  - body: `{ "name", "email", "password" }`
- `POST /auth/login`
  - body: `{ "email", "password" }`
  - retorno de sucesso inclui `token`.

### Task (privado, requer Bearer token)

- `POST /task/create`
  - body: `{ "title", "type", "status", "description", "priority" }`
- `GET /task/list`
- `PATCH /task/update/:idTask`
  - body: `{ "status": true|false }`
- `DELETE /task/delete/:idTask`

## 8) Variaveis de Ambiente

Referencia em [backend/.env.example](backend/.env.example):

- `PORT=`
- `DATABASE_URL=`
- `JWT_SECRET=`

Exemplo local:

- `PORT=3000`
- `DATABASE_URL=postgres://usuario:senha@localhost:5432/todolist`
- `JWT_SECRET=sua_chave_super_secreta`

## 9) Pontos Fortes

- Boa separacao de responsabilidades por camada.
- Regras de ownership de tarefa ja implementadas.
- Uso de SQL parametrizado, reduzindo risco de SQL Injection.
- Uso de hash de senha e JWT.

## 10) Riscos e Ajustes Recomendados

### Risco 1: tratamento de erro inconsistente

- Atualmente controllers usam `next(error)`, mas nao existe middleware global de erro no app.
- Efeito: possivel resposta padrao ruim ou vazamento de stack, dependendo do ambiente.

Acao:

- Adicionar middleware de erro em [backend/src/app.js](backend/src/app.js).
- Padronizar resposta em JSON: `message`, `code`, `details`.

### Risco 2: semantica HTTP

- Alguns cenarios de validacao estao retornando 404, mesmo quando nao e recurso inexistente.

Acao:

- Usar 400 para validacao.
- Usar 401 para token ausente/invalido.
- Usar 403 para tentativa em recurso sem permissao.
- Usar 404 para recurso realmente inexistente.

### Risco 3: CORS aberto

- `cors()` global sem restricao.

Acao:

- Definir origem do frontend em producao.

### Risco 4: falta de testes

- Nao ha testes automatizados de contrato e regra de negocio.

Acao:

- Criar testes de integracao para auth/task.

## 11) SQL Esperado (Base)

Sugestao minima de schema para rodar o backend:

```sql
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(120) NOT NULL,
	email VARCHAR(160) NOT NULL UNIQUE,
	password TEXT NOT NULL
);

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	title VARCHAR(180) NOT NULL,
	type VARCHAR(80) NOT NULL,
	status BOOLEAN NOT NULL DEFAULT false,
	description TEXT NOT NULL,
	priority VARCHAR(30) NOT NULL
);
```

## 12) Backlog Tecnico Priorizado

### Prioridade Alta

- [ ] Implementar middleware global de erro.
- [ ] Revisar codigos HTTP em controllers/services.
- [ ] Definir CORS por ambiente.

### Prioridade Media

- [ ] Criar modulo de validacao de entrada (ex: zod/joi).
- [ ] Adicionar endpoint de atualizar campos alem de status (title, description, etc).
- [ ] Adicionar paginacao em listagem de tarefas.

### Prioridade Baixa

- [ ] Adicionar logs estruturados.
- [ ] Criar documentacao OpenAPI/Swagger.

## 13) Fluxo Resumido da Requisicao

1. Request chega na rota.
2. Se for `/task`, passa pelo middleware `auth` e injeta `userId`.
3. Controller extrai dados e chama service.
4. Service valida regra e chama model.
5. Model executa SQL no PostgreSQL.
6. Controller responde JSON.
