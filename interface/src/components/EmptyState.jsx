import "./EmptyState.css";

function EmptyState({ onClick }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📋</div>
      <h3>Nenhuma tarefa ainda</h3>
      <p>Crie sua primeira tarefa para começar a organizar suas atividades</p>
      {/* TODO: onClick={handleCreateTask} */}
      <button className="empty-state-btn" onClick={onClick}>
        + Criar Tarefa
      </button>
    </div>
  );
}

export default EmptyState;
