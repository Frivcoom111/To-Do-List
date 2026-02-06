let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function loadTasks() {
  const tableBody = document.querySelector(".table-body");
  const paragraph = document.querySelector(".paragraph");

  tableBody.innerHTML = tasks
    .map((task) => {
      return `
        <tr>
            <td>${task.name}</td>
            <td>${task.desc}</td>
            <td>${task.category}</td>
            <td>${formatDate(task.date)}</td>
            <td>${task.completed ? "Concluída" : "Pendente"}</td>
            <td>
                <img src="assets/editar.png" class="icon" onclick="editTask(${task.id})">
                <img src="assets/delete.png" class="icon" onclick="deleteTask(${task.id})">
            </td>
        </tr>
    `;
    })
    .join("");

    if(tasks.length > 0) {
        paragraph.innerHTML = "";
    } else {
        paragraph.innerHTML = "Nenhuma tarefa encontrada!";

    }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  loadTasks();
}

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("pt-BR");
}

if (tasks.length > 0) loadTasks();
