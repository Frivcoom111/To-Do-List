const addTaskButton = document.querySelector(".addTask-button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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

    clearForm()
}

function clearForm() {
    document.querySelector("#task-name").value = "";
    document.querySelector("#task-desc").value = "";
    document.querySelector("#task-category").value = "";
    document.querySelector("#task-date").value = "";
    document.querySelector("#task-priority").value = "";
}

addTaskButton.addEventListener("click", addTask);