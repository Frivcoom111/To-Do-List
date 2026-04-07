import express from "express";
import taskController from "../controllers/taskController.js";

const routes = express.Router();

routes.post("/create", (request, response, next) =>
  taskController.create(request, response, next),
);

routes.get("/list", (request, response, next) =>
  taskController.list(request, response, next),
);

routes.get("/list/:id", (request, response, next) =>
  taskController.getTaskById(request, response, next),
);

routes.delete("/delete/:idTask", (request, response, next) =>
  taskController.delete(request, response, next),
);

routes.patch("/update/:idTask", (request, response, next) =>
  taskController.updateStatus(request, response, next),
);

export default routes;
