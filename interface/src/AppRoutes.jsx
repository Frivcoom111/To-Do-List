import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import HomePage from "./pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import CreateTaskPage from "./pages/createTask/CreateTaskPage";
import TasksDetailsPage from "./pages/tasksDetails/TasksDetails";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

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
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/new"
          element={
            <ProtectedRoute>
              <CreateTaskPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:taskId"
          element={
            <ProtectedRoute>
              <TasksDetailsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default AppRoutes;
