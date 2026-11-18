
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// Save tasks in Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
function addTask() {

    let input = document.getElementById("taskInput");

    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    input.value = "";

    saveTasks();

    displayTasks();
}

// Display tasks
function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;

    });

    filteredTasks.forEach(task => {

        let li = document.createElement("li");

        let span = document.createElement("span");

        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        let actions = document.createElement("div");

        actions.className = "task-actions";

        // Complete or Undo button
        let completeBtn = document.createElement("button");

        completeBtn.textContent = task.completed ? "Undo" : "Complete";

        completeBtn.className = "complete";

        completeBtn.onclick = () => toggleTask(task.id);

        // Edit button
        let editBtn = document.createElement("button");

        editBtn.textContent = "Edit";

        editBtn.className = "edit";

        editBtn.onclick = () => editTask(task.id);

        // Delete button
        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.className = "delete";

        deleteBtn.onclick = () => deleteTask(task.id);

        actions.append(completeBtn, editBtn, deleteBtn);

        li.append(span, actions);

        taskList.appendChild(li);

    });

    document.getElementById("taskCount").textContent =
        "Total Tasks: " + tasks.length;
}

// Mark task as completed or pending
function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });

    saveTasks();

    displayTasks();
}

// Edit task
function editTask(id) {

    let task = tasks.find(task => task.id === id);

    let newText = prompt("Edit your task:", task.text);

    if (newText !== null && newText.trim() !== "") {

        task.text = newText.trim();

        saveTasks();

        displayTasks();
    }
}

// Delete task
function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    displayTasks();
}

// Filter tasks
function filterTasks(filter) {

    currentFilter = filter;

    displayTasks();
}

// Clear completed tasks
function clearCompleted() {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    displayTasks();
}

// Display tasks when page loads
displayTasks();
