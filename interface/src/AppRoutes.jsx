import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import HomePage from "./pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import CreateTaskPage from "./pages/createTask/CreateTaskPage";
import TasksDetailsPage from "./pages/tasksDetails/TasksDetails";

function AppRoutes() {
  return (
    <div>
      <div
        className="loader"
        role="status"
        aria-live="polite"
        aria-label="Carregando"
      >
        <span className="loader-spinner" aria-hidden="true"></span>
        <p>Carregando...</p>
      </div>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tasks/new" element={<CreateTaskPage />} />
        <Route path="/tasks/:taskId" element={<TasksDetailsPage />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
