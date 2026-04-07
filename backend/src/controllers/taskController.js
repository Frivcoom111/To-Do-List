import taskService from "../services/taskService.js";

class TaskController {
  async create(request, response, next) {
    try {
      const { title, type, status, description, priority } = request.body;
      const userId = request.userId;

      const createdTask = await taskService.create(
        userId,
        title,
        type,
        status,
        description,
        priority,
      );
      if (!createdTask) {
        return response.status(404).json({ message: "Erro ao criar tarefa." });
      }

      response.status(201).json({
        message: "Tarefa criado com sucesso.",
        task: createdTask.task,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(request, response, next) {
    try {
      const id = request.userId;
      if (!id) {
        return response.status(404).json({ message: "ID usuário inválido." });
      }

      const taskList = await taskService.listByUserId(id);

      response.status(200).json({
        message: "Tarefas listadas com sucesso.",
        tasks: taskList.tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(request, response, next) {
    try {
      const { id } = request.params;

      const task = await taskService.getTaskById(id, request.userId);
      if (!task) {
        return response.status(404).json({ message: "Tarefa não existe." });
      }

      response
        .status(200)
        .json({ message: "Tarafe buscada com sucesso!", task: task.task });
    } catch (error) {
      next(error);
    }
  }

  async delete(request, response, next) {
    try {
      const userId = request.userId;
      const { idTask } = request.params;
      if (!idTask) {
        return response.status(404).json({ message: "ID tarefa inválido." });
      }

      const deletedTask = await taskService.delete(idTask, userId);

      response
        .status(200)
        .json({ message: "Tarefa deletada com sucesso!", deletedTask });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(request, response, next) {
    try {
      const { idTask } = request.params;
      const { status } = request.body;
      const userId = request.userId;

      if (!idTask) {
        return response.status(404).json({ message: "ID tarefa inválido." });
      }

      const updatedTask = await taskService.updateStatus(
        status,
        idTask,
        userId,
      );

      response.status(200).json({ message: "Tarefa atualizada com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
