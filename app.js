let text = document.querySelector(".task");
let date = document.querySelector(".date");
let button = document.querySelector("#btn");
let container = document.querySelector(".container");
let hr = document.querySelector(".line");
let deleteButton = document.querySelector(".deleteButton");

button.addEventListener('click', function() {
    const container = document.querySelector('.container');

    const newContainer = container.cloneNode(true);
    newContainer.querySelector('.task').value = '';
    newContainer.querySelector('.date').value = '';

    document.getElementById('taskList').appendChild(newContainer);
});

// Function to load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    savedTasks.forEach(task => {
        const newContainer = createTaskContainer(task.text, task.date);
        taskList.appendChild(newContainer);
    });
}

// Function to save tasks to local storage
function saveTasks() {
    const taskContainers = document.querySelectorAll('#taskList .container');
    const tasks = Array.from(taskContainers).map(container => ({
        text: container.querySelector('.task').value,
        date: container.querySelector('.date').value
    }));

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task container
function createTaskContainer(taskValue = '', dateValue = '') {
    const container = document.createElement('div');
    container.className = 'container';

    const taskInput = document.createElement('input');
    taskInput.className = 'task';
    taskInput.type = 'text';
    taskInput.placeholder = 'Enter Your Task';
    taskInput.name = 'task';
    taskInput.minLength = 1;
    taskInput.maxLength = 40;
    taskInput.value = taskValue;

    const dateInput = document.createElement('input');
    dateInput.className = 'date';
    dateInput.type = 'date';
    dateInput.name = 'Date';
    dateInput.value = dateValue;

    const buttonSpan = document.createElement('span');
    buttonSpan.className = 'button';
    
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.addEventListener('click', () => {
        const newContainer = createTaskContainer();
        document.getElementById('taskList').appendChild(newContainer);
    });

    buttonSpan.appendChild(addButton);
    container.appendChild(taskInput);
    container.appendChild(dateInput);
    container.appendChild(buttonSpan);

    return container;
}

document.getElementById('addButton').addEventListener('click', () => {
    const newContainer = createTaskContainer();
    document.getElementById('taskList').appendChild(newContainer);
});

document.getElementById('saveButton').addEventListener('click', saveTasks);

// Load tasks when the page loads
window.addEventListener('load', loadTasks);


