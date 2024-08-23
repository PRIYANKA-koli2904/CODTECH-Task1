document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach(task => createTaskElement(task));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Create task element
    const createTaskElement = (task) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(li);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(li);

        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    // Add task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            createTaskElement({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
        }
    };

    // Edit task
    const editTask = (li) => {
        const taskText = li.querySelector('.task-text');
        const newTaskText = prompt('Edit task:', taskText.textContent);
        if (newTaskText !== null) {
            taskText.textContent = newTaskText;
            saveTasks();
        }
    };

    // Delete task
    const deleteTask = (li) => {
        if (confirm('Are you sure you want to delete this task?')) {
            li.remove();
            saveTasks();
        }
    };

    // Toggle task completion
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('task-text')) {
            e.target.parentElement.classList.toggle('completed');
            saveTasks();
        }
    });

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Initial load
    loadTasks();
});
