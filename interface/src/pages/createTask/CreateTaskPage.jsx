import "./CreateTaskPage.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

function CreateTaskPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Pessoal");
  const [priority, setPriority] = useState("Baixa");
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState("");

  async function handleCreateTask(e) {
    e.preventDefault();
    try {
      const response = await api.post("/task/create", {
        title: title,
        type: type,
        status: status,
        description: description,
        priority: priority,
      });

      alert(response.data.message);

      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar task.");

      navigate("/home");
    }
  }
  return (
    <>
      <Navbar />
      <div className="create-task-page">
        <section className="create-task-shell">
          <div className="create-task-header">
            <p className="create-task-badge">Nova tarefa</p>
            <h1>Organize sua proxima entrega</h1>
            <p>
              Preencha os dados abaixo para cadastrar sua tarefa com prioridade
              e status inicial.
            </p>
          </div>

          <form className="create-task-form" onSubmit={handleCreateTask}>
            <div className="field-group field-group-full">
              <label htmlFor="title">Titulo</label>
              <input
                id="title"
                type="text"
                placeholder="Ex.: Revisar projeto final"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="type">Tipo</label>
              <select
                id="type"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Pessoal">Pessoal</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Estudo">Estudo</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="priority">Prioridade</label>
              <select
                id="priority"
                required
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            <div className="field-group field-group-full">
              <label htmlFor="status">Status inicial</label>
              <select
                id="status"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={false}>Pendente</option>
                <option value={true}>Concluida</option>
              </select>
            </div>

            <div className="field-group field-group-full">
              <label htmlFor="description">Descricao</label>
              <textarea
                id="description"
                rows="5"
                placeholder="Descreva os detalhes da tarefa..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="create-task-actions field-group-full">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/home")}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Criar tarefa
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default CreateTaskPage;
