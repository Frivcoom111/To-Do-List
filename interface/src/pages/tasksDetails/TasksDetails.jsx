import Navbar from "../../components/Navbar";
import "./TasksDetails.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function TasksDetailsPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadTaskDetails() {
      try {
        const response = await api.get(`task/list/${taskId}`);

        const selectedTask = response.data.task;

        if (!ignore) {
          if (!selectedTask) {
            setErrorMessage("Tarefa não encontrada.");
            return;
          }
          setTask(selectedTask);
        }
      } catch (error) {
        console.error(error);
        if (!ignore) {
          const apiMessage = error?.response?.data?.message;
          setErrorMessage(apiMessage || "Erro ao carregar a tarefa.");
        }
      }
    }

    loadTaskDetails();

    return () => {
      ignore = true;
    };
  }, [taskId]);

  async function handleCompleteTask() {
    if (!task || task.status === true) return;

    setSuccessMessage("");
    setErrorMessage("");

    try {
      await api.patch(`task/update/${task.id}`, { status: true });
      setTask((currentTask) => ({ ...currentTask, status: true }));
      setSuccessMessage("Tarefa atualizada com sucesso.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error(error);
      const apiMessage = error?.response?.data?.message;
      setErrorMessage(apiMessage || "Erro ao atualizar a tarefa.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  if (!task) {
    return (
      <>
        <Navbar />
        <div className="task-details-page">
          <section className="task-details-shell">
            <div className="task-details-error">
              <p className="task-details-badge">Detalhes da tarefa</p>
              <h1>Tarefa não encontrada</h1>
              <p>
                {errorMessage ||
                  "A tarefa que você procura não existe ou foi removida."}
              </p>
              <button
                type="button"
                className="task-details-btn task-details-btn-primary"
                onClick={() => navigate("/home")}
              >
                Voltar para o início
              </button>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="task-details-page">
        <section className="task-details-shell">
          <div className="task-details-header">
            <div>
              <p className="task-details-badge">Detalhes da tarefa</p>
              <h1>{task.title}</h1>
              <p>
                Consulte as informações da tarefa e atualize o status quando ela
                for concluída.
              </p>
            </div>

            <div className="task-details-actions">
              <button
                type="button"
                className="task-details-btn task-details-btn-secondary"
                onClick={() => navigate("/home")}
              >
                Voltar
              </button>

              <button
                type="button"
                className="task-details-btn task-details-btn-primary"
                onClick={handleCompleteTask}
                disabled={task.status === true}
              >
                {task.status === true
                  ? "Tarefa concluída"
                  : "Marcar como concluída"}
              </button>
            </div>
          </div>

          <div className="task-details-content">
            {errorMessage && (
              <div className="task-details-feedback task-details-feedback-error">
                <p>{errorMessage}</p>
              </div>
            )}

            {successMessage && (
              <div className="task-details-feedback task-details-feedback-success">
                <p>{successMessage}</p>
              </div>
            )}

            <div className="task-details-summary">
              <div className="task-details-status-card">
                <span
                  className={
                    task.status === true
                      ? "task-status-pill task-status-pill-completed"
                      : "task-status-pill task-status-pill-pending"
                  }
                >
                  {task.status === true ? "Concluída" : "Pendente"}
                </span>
                <strong>{task.title}</strong>
                <p>
                  {task.status === true
                    ? "Essa tarefa já foi finalizada e sincronizada com o banco."
                    : "Quando finalizar esta atividade, use o botão acima para atualizar o status."}
                </p>
              </div>

              <div className="task-details-grid">
                <article className="task-details-card">
                  <span className="task-details-label">Tipo</span>
                  <br />
                  <strong>{task.type}</strong>
                </article>

                <article className="task-details-card">
                  <span className="task-details-label">Prioridade</span>
                  <br />
                  <strong>{task.priority}</strong>
                </article>

                <article className="task-details-card">
                  <span className="task-details-label">ID da tarefa</span>
                  <br />
                  <strong>#{task.id}</strong>
                </article>

                <article className="task-details-card">
                  <span className="task-details-label">Descrição</span>
                  <p>{task.description}</p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default TasksDetailsPage;
