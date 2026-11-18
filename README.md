# Ex03 To-Do List using JavaScript
## Date: 18/11/2026

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM

### index.html
```

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo Application</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">

        <h1>My Todo List</h1>

        <!-- Add Task -->
        <div class="input-section">
            <input type="text" id="taskInput" placeholder="Enter your task">
            <button onclick="addTask()">Add Task</button>
        </div>

        <!-- Filter Buttons -->
        <div class="filters">
            <button onclick="filterTasks('all')">All</button>
            <button onclick="filterTasks('pending')">Pending</button>
            <button onclick="filterTasks('completed')">Completed</button>
        </div>

        <!-- Task List -->
        <ul id="taskList"></ul>

        <!-- Footer -->
        <div class="footer">
            <p id="taskCount">Total Tasks: 0</p>
            <button onclick="clearCompleted()">Clear Completed</button>
        </div>

    </div>

    <script src="script.js"></script>

</body>
</html>


```
### script.js

```

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


```
### style.css

```

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f1e8ff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.container {
    background: white;
    width: 550px;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #6c42a0;
    margin-bottom: 25px;
}

.input-section {
    display: flex;
    gap: 10px;
}

input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
}

button {
    padding: 10px 14px;
    border: none;
    border-radius: 6px;
    background: #8656bd;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #663b96;
}

.filters {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
}

#taskList {
    list-style: none;
}

#taskList li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 12px;
    margin-bottom: 10px;
    background: #f5f0fa;
    border-radius: 6px;
    flex-wrap: wrap;
}

#taskList li span {
    flex: 1;
    overflow-wrap: anywhere;
}

.completed {
    text-decoration: line-through;
    color: gray;
}

.task-actions {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
}

.complete {
    background: #27ae60;
}

.edit {
    background: #3498db;
}

.delete {
    background: #e74c3c;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    font-size: 14px;
}

```

## OUTPUT

<img width="1917" height="1132" alt="image" src="https://github.com/user-attachments/assets/20a5cf2f-a783-4c64-bb8e-c7956b023174" />
<img width="1917" height="1131" alt="image" src="https://github.com/user-attachments/assets/4c981c84-4364-4917-a574-54d83c786ee7" />
<img width="1917" height="1130" alt="image" src="https://github.com/user-attachments/assets/18c7cdca-db5c-474c-8fc7-7ccbe9010e43" />





## RESULT
The program for creating To-do list using JavaScript is executed successfully.
