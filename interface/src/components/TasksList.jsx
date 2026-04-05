import "./TasksList.css";

function TaskList({ tasks, onViewDetails }) {
  return (
    <div className="tasklist-wrapper">
      <ul className="tasklist-items">
        {tasks.map((task) => (
          <li className={task.status === true ? "task-card task-card-completed" : "task-card"} key={task.id}>
            <div className="task-status">
              <span className={task.status === true ? "task-dot-completed" : "task-dot"} aria-hidden="true" />
            </div>

            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-meta">{task.priority}</p>
            </div>

            <div className="task-actions">
              <span className={task.status === true ? "task-badge task-badge-completed" : "task-badge task-badge-pending"}>{task.status === true ? "Concluída" : "Pendente"}</span>
              <button type="button" className="task-detail-button" onClick={() => onViewDetails?.(task)}>
                Detalhes
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
