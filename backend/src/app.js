import express from "express";
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js";
import { auth } from "./middlewares/authMiddlewares.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/task", auth, taskRoutes);

export default app;