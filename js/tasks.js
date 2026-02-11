let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function loadTasks() {
  const tableBody = document.querySelector(".table-body");
  const paragraph = document.querySelector(".paragraph");

  if (!Array.isArray(tasks)) {
    tasks = [];
  }

  tableBody.innerHTML = tasks.map((task) => {
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
    }).join("");

  if (tasks.length > 0) {
    paragraph.innerHTML = "";
  } else {
    paragraph.innerHTML = "Nenhuma tarefa encontrada!";
  }
}

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-BR");
}

const addTaskButton = document.querySelector(".addTask-button");

function addTask() {
    const taskName = document.querySelector("#task-name").value || "";
    const taskDesc = document.querySelector("#task-desc").value || "";
    const taskCategory = document.querySelector("#task-category").value || "";
    const taskDate = document.querySelector("#task-date").value || "";
    const taskPriority = document.querySelector("#task-priority").value || "";

    if (taskName === "" || taskDate === "") return;

    const newTask = {
        id: Date.now(),
        name: taskName,
        desc: taskDesc,
        category: taskCategory,
        date: taskDate,
        priority: taskPriority,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    clearForm();
    window.location.href = "index.html";
}

function clearForm() {
    document.querySelector("#task-name").value = "";
    document.querySelector("#task-desc").value = "";
    document.querySelector("#task-category").value = "";
    document.querySelector("#task-date").value = "";
    document.querySelector("#task-priority").value = "";
}

if (addTaskButton) {
    addTaskButton.addEventListener("click", addTask);
}

loadTasks();