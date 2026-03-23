import express from "express";
import authController from "../controllers/authController.js"

const routes = express.Router();

routes.post("/register", (request, response, next) =>  authController.register(request, response, next));

routes.post("/login", (request, response, next) => authController.login(request, response, next));

export default routes;
