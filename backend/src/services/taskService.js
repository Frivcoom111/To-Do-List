import Task from "../models/TaskModel.js";
import User from "../models/UserModel.js";

class TaskService {
  constructor() {
    this.task = new Task();
    this.user = new User();
  }

  async create(userId, title, type, status, description, priority) {
    // Função para validar status, por conta do mesmo ser um bool.
    const isDefined = (value) => value !== undefined && value !== null;

    // Validação campos.
    if (
      !userId ||
      !title ||
      !type ||
      !isDefined(status) ||
      !description ||
      !priority
    ) {
      throw new Error("Todos os campos são obrigatório.");
    }

    // Criando task
    const task = await this.task.create(
      userId,
      title,
      type,
      status,
      description,
      priority,
    );
    if (!task) {
      throw new Error("Erro ao criar task.");
    }

    return {
      task,
    };
  }

  async listByUserId(id) {
    // Validando ID usuários
    const userExists = await this.user.findById(id);
    if (!userExists) {
      throw new Error("ID usuário inválido.");
    }

    const tasks = await this.task.findByUserId(id);

    return {
      tasks,
    };
  }

  async getTaskById(idTask, userId) {
    const taskExists = await this.task.findTaskById(idTask);

    if (!taskExists) {
      throw new Error("Tarefa não existe.");
    }

    if (String(taskExists.user_id) !== String(userId)) {
      throw new Error("Tarefa não pertence a este usuário.");
    }

    return {
      task: taskExists,
    };
  }

  async delete(idTask, userId) {
    const taskExists = await this.task.findTaskById(idTask);

    if (!taskExists) {
      throw new Error("Tarefa não existe.");
    }

    if (String(taskExists.user_id) !== String(userId)) {
      throw new Error("Tarefa não pertence a este usuário.");
    }

    const deletedTask = await this.task.delete(idTask);
    return deletedTask;
  }

  async updateStatus(status, idTask, userId) {
    const taskExists = await this.task.findTaskById(idTask);

    const isDefined = (value) => value !== undefined && value !== null;

    if (!isDefined(status)) {
      throw new Error("Campo status inválido.");
    }

    if (!taskExists) {
      throw new Error("Tarefa não existe.");
    }

    if (taskExists.user_id != userId) {
      throw new Error("Tarefa não pertence a este usuário.");
    }

    const updatedTask = await this.task.updateStatus(status, idTask);
    return updatedTask;
  }
}

export default new TaskService();
