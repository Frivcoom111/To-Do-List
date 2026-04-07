import "./HomePage.css";
import Navbar from "../../components/Navbar";
import EmptyState from "../../components/EmptyState";
import api from "../../services/api";
import { useEffect, useState } from "react";
import TaskList from "../../components/TasksList";
import { useNavigate } from "react-router-dom";

function HomePage() {
  // Usado para navegar entre as páginas
  const navigate = useNavigate();

  // useStates para atualização da variavel tasks posteriormente.
  const [tasks, setTasks] = useState([]);

  // Requisição backend para poder carregar as tasks.
  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      try {
        const response = await api.get("task/list");
        if (!ignore) {
          setTasks(response.data.tasks);
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao carregar tasks.");

        localStorage.removeItem("token");

        navigate("/");
      }
    }

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleDeleteTask(task) {
    if (!confirm(`Deseja realmente deletar "${task.title}"?`)) return;
    try {
      await api.delete(`task/delete/${task.id}`);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (error) {
      console.log(error);
      alert("Erro ao deletar tarefa.");
    }
  }

  function handleCreateTask() {
    navigate("/tasks/new");
  }

  return (
    <>
      <Navbar />
      <div className="home-page">
        {/* Header Section */}
        <section className="home-header">
          <div className="header-content">
            <h1>Suas Tarefas</h1>
            <p>Acompanhe suas atividades e mantenha-se produtivo</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{tasks.length || 0}</span>
              <span className="stat-label">Total de tarefas</span>
            </div>
            <div className="stat-card">
              {/* TODO: Substituir por contagem de tarefas concluídas */}
              <span className="stat-number">
                {tasks.filter((task) => task.status).length}
              </span>
              <span className="stat-label">Concluídas</span>
            </div>
          </div>
        </section>

        {/* Main Task Area */}
        <section className="tasks-container">
          <div className="tasks-header">
            <h2>Tarefas do dia</h2>
            <select className="filter-select" defaultValue="all">
              <option value="all">Todas</option>
              <option value="pending">Pendentes</option>
              <option value="completed">Concluídas</option>
            </select>
          </div>

          <div className="tasks-list">
            {/* TODO: Adicionar condicional: tasks.length === 0 ? <empty-state /> : <tasks-list /> */}
            {tasks.length === 0 ? (
              <EmptyState onClick={handleCreateTask} />
            ) : (
              <TaskList
                tasks={tasks}
                onViewDetails={(task) => navigate(`/tasks/${task.id}`)}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
        </section>

        {/* Floating Action Button */}
        <button
          className="fab"
          title="Criar nova tarefa"
          aria-label="Criar nova tarefa"
          onClick={handleCreateTask}
        >
          <span>+</span>
        </button>
      </div>
    </>
  );
}

export default HomePage;
