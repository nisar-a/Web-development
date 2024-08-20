function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const prioritySelect = document.getElementById('prioritySelect');

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');

        const priorityLabel = document.createElement('span');
        priorityLabel.className = `priority-${prioritySelect.value}`;
        priorityLabel.textContent = prioritySelect.value.charAt(0).toUpperCase() + prioritySelect.value.slice(1);

        li.textContent = taskInput.value;
        li.insertBefore(priorityLabel, li.firstChild);

        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.onclick = function() {
            moveToDeleted(this.parentElement);
        };

        li.appendChild(removeButton);

        li.onclick = function() {
            this.classList.toggle('completed');
        };

        taskList.appendChild(li);

        saveTasks();

        taskInput.value = '';
        prioritySelect.value = 'normal';
    }
}

function moveToDeleted(taskElement) {
    const deletedTaskList = document.getElementById('deletedTaskList');
    const restoreButton = document.createElement('button');
    restoreButton.innerHTML = '<i class="fas fa-undo"></i>';
    restoreButton.onclick = function() {
        restoreTask(this.parentElement);
    };
    
    taskElement.removeChild(taskElement.querySelector('button'));
    taskElement.appendChild(restoreButton);
    deletedTaskList.appendChild(taskElement);
    saveTasks();
    saveDeletedTasks();
}

function restoreTask(taskElement) {
    const taskList = document.getElementById('taskList');
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.onclick = function() {
        moveToDeleted(this.parentElement);
    };
    
    taskElement.removeChild(taskElement.querySelector('button'));
    taskElement.appendChild(removeButton);
    taskList.appendChild(taskElement);
    saveTasks();
    saveDeletedTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.textContent.replace('Remove', '').trim(),
            completed: li.classList.contains('completed'),
            priority: li.querySelector('span').className.split('-')[1]
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveDeletedTasks() {
    const deletedTasks = [];
    document.querySelectorAll('#deletedTaskList li').forEach(li => {
        deletedTasks.push({
            text: li.textContent.replace('Restore', '').trim(),
            priority: li.querySelector('span').className.split('-')[1]
        });
    });
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;

            const priorityLabel = document.createElement('span');
            priorityLabel.className = `priority-${task.priority}`;
            priorityLabel.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

            li.insertBefore(priorityLabel, li.firstChild);

            const removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="fas fa-trash"></i>';
            removeButton.onclick = function() {
                moveToDeleted(this.parentElement);
            };

            li.appendChild(removeButton);

            if (task.completed) {
                li.classList.add('completed');
            }

            li.onclick = function() {
                this.classList.toggle('completed');
                saveTasks();
            };

            taskList.appendChild(li);
        });
    }
}

function loadDeletedTasks() {
    const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks'));
    if (deletedTasks) {
        deletedTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;

            const priorityLabel = document.createElement('span');
            priorityLabel.className = `priority-${task.priority}`;
            priorityLabel.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

            li.insertBefore(priorityLabel, li.firstChild);

            const restoreButton = document.createElement('button');
            restoreButton.innerHTML = '<i class="fas fa-undo"></i>';
            restoreButton.onclick = function() {
                restoreTask(this.parentElement);
            };

            li.appendChild(restoreButton);

            deletedTaskList.appendChild(li);
        });
    }
}

window.onload = function() {
    loadTasks();
    loadDeletedTasks();
};
