const taskInput = document.getElementById('taskInput');
const addTask = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    if ((filter === 'active' && task.completed) || (filter === 'completed' && !task.completed)) return;

    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})" />
      <span>${task.text}</span>
      <button onclick="deleteTask(${index})">🗑️</button>
    `;

    taskList.appendChild(li);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addNewTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  taskInput.value = '';
  renderTasks(getActiveFilter());
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks(getActiveFilter());
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(getActiveFilter());
}

addTask.onclick = addNewTask;
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addNewTask();
});

filterButtons.forEach(button => {
  button.onclick = () => {
    document.querySelector('.filter-buttons .active').classList.remove('active');
    button.classList.add('active');
    renderTasks(button.dataset.filter);
  };
});

function getActiveFilter() {
  return document.querySelector('.filter-buttons .active').dataset.filter;
}

window.onload = () => {
  renderTasks();
};



