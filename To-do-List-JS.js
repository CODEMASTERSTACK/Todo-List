   // This event ensures that the loadTasks function is called when the HTML document has been completely loaded and parsed.
   document.addEventListener("DOMContentLoaded", loadTasks);


   // This function retrieves the tasks from local storage, parses them, and renders each task using the renderTask function. If a task is marked as completed, it adds a 'completed' class to it.
   function loadTasks() {
       const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
       tasks.forEach(task => {
           // Render each task
           renderTask(task);
           if (task.completed) {
               const listBox = document.querySelector(`li[data-task-id="${task.id}"] .box`);
               listBox.classList.add('completed');
           }
       });
   }


   // This function saves the tasks array to local storage, converting it to a JSON string.
   function saveTasks(tasks) {
       // Save tasks to local storage
       localStorage.setItem('tasks', JSON.stringify(tasks.map(task => ({
           id: task.id,
           text: task.text,
           date: task.date,
           time: task.time,
           completed: task.completed
       }))));
   }


   // This function retrieves the tasks from local storage and parses them. If no tasks are found, it returns an empty array.
   function getTasks() {
       // Get tasks from local storage
       return JSON.parse(localStorage.getItem('tasks')) || [];
   }


   // This function displays a fade message when a task is completed, gradually fading out after 2 seconds.
   function showFadeMessage() {
       // Show a fade message when a task is completed
       const fadeMessage = document.getElementById('fade-message');
       fadeMessage.style.display = 'block';
       fadeMessage.style.opacity = 1;
       setTimeout(() => {
           fadeMessage.style.opacity = 0;
           setTimeout(() => fadeMessage.style.display = 'none', 1000);
       }, 2000);
   }



   // This function renders a task element with various components such as a checkbox, task text, date, time, edit button, and delete button. Event listeners are added for the checkbox, edit button, and delete button to handle their respective functionalities.

   function renderTask(task) {
       // Render a task in the task list
       const ul = document.getElementById('list');
       const liCr = document.createElement('li');
       liCr.className = "li-elem";

       // This code block is responsible for creating a checkbox element for each task in the task list.
       // The checkbox is created using the 'createElement' method and assigned the 'checkbox-elem' class.
       // The 'checked' property of the checkbox is initially set to the 'completed' status of the task.
       // An event listener is added to the checkbox using the 'addEventListener' method. This event listener listens for changes in the 'checked' property of the checkbox.
       // When the 'checked' property changes, the 'completed' status of the task is updated to match the new state of the checkbox.
       // The 'saveTasks' function is then called to save the updated tasks to local storage.
       // If the task is marked as completed, the 'showFadeMessage' function is called to display a notification message.
       // If the task is not marked as completed, the 'completed' class is removed from the task element.
       const checkBox = document.createElement('input');
       checkBox.type = "checkbox";
       checkBox.className = "checkbox-elem";
       checkBox.checked = task.completed;
       checkBox.addEventListener('change', () => {
           task.completed = checkBox.checked;
           saveTasks(getTasks().map(t => t.id === task.id ? task : t));
           if (task.completed) {
               showFadeMessage();
               const listBox = checkBox.parentNode;
               listBox.classList.add('completed');
           } else {
               const listBox = checkBox.parentNode;
               listBox.classList.remove('completed');
           }
       });

       // This code block is responsible for creating a task element with various components such as a checkbox, task text, date, time, edit button, and delete button.
       // Event listeners are added for the checkbox, edit button, and delete button to handle their respective functionalities.
       // The checkbox is created using the 'createElement' method and assigned the 'checkbox-elem' class.
       // The 'checked' property of the checkbox is initially set to the 'completed' status of the task.
       // An event listener is added to the checkbox using the 'addEventListener' method. This event listener listens for changes in the 'checked' property of the checkbox.
       // When the 'checked' property changes, the 'completed' status of the task is updated to match the new state of the checkbox.
       // The 'saveTasks' function is then called to save the updated tasks to local storage.
       // If the task is marked as completed, the 'showFadeMessage' function is called to display a notification message.
       // If the task is not marked as completed, the 'completed' class is removed from the task element.
       const taskText = document.createElement('span');
       taskText.className = "task-text";
       taskText.appendChild(document.createTextNode(task.text));

       const timeCr = document.createElement('p');
       timeCr.className = "time-elem";
       timeCr.appendChild(document.createTextNode(task.time || "No time selected"));

       const dateCr = document.createElement('p');
       dateCr.className = "date-elem";
       dateCr.appendChild(document.createTextNode(task.date || "No date selected"));

       const editButton = document.createElement('button');
       editButton.className = "edit-button";
       editButton.appendChild(document.createTextNode("Edit"));
       editButton.onclick = function() {
           const newTask = prompt("Edit your task:", taskText.innerText);
           if (newTask) {
               taskText.innerText = newTask;
               task.text = newTask;
               saveTasks(getTasks().map(t => t.id === task.id ? task : t));
           }
       };

       // This code block is responsible for creating a task element with various components such as a checkbox, task text, date, time, edit button, and delete button.
       // Event listeners are added for the checkbox, edit button, and delete button to handle their respective functionalities.
       // The checkbox is created using the 'createElement' method and assigned the 'checkbox-elem' class.
       // The 'checked' property of the checkbox is initially set to the 'completed' status of the task.
       // An event listener is added to the checkbox using the 'addEventListener' method. This event listener listens for changes in the 'checked' property of the checkbox.
       // When the 'checked' property changes, the 'completed' status of the task is updated to match the new state of the checkbox.
       // The 'saveTasks' function is then called to save the updated tasks to local storage.
       // If the task is marked as completed, the 'showFadeMessage' function is called to display a notification message.
       // If the task is not marked as completed, the 'completed' class is removed from the task element.
       const deleteButton = document.createElement('button');
       deleteButton.className = "delete-button";
       deleteButton.appendChild(document.createTextNode("Delete"));
       deleteButton.onclick = function() {
           ul.removeChild(listBox);
           saveTasks(getTasks().filter(t => t.id !== task.id));
       };

       const listBox = document.createElement('div');
       listBox.className = "box";
       listBox.setAttribute('data-task-id', task.id);
       if (task.completed) {
           listBox.classList.add('completed');
       }
       listBox.appendChild(checkBox);
       listBox.appendChild(taskText);
       listBox.appendChild(timeCr);
       listBox.appendChild(dateCr);
       listBox.appendChild(editButton);
       listBox.appendChild(deleteButton);

       ul.appendChild(listBox);
   }


   // This function creates a new task based on the user's input, date, and time, and then renders it. The new task is added to the task list and saved to local storage

   function newItem() {
       // Add a new item to the task list
       const date = document.getElementById('date').value;
       const time = document.getElementById('time').value;
       const input = document.getElementById('input').value;

       if (/\S/.test(input)) {
           const task = {
               id: Date.now(),
               text: input,
               date: date || "No date selected",
               time: time || "No time selected",
               completed: false
           };

           renderTask(task);

           const tasks = getTasks();
           tasks.push(task);
           saveTasks(tasks);

           document.getElementById('date').value = "";
           document.getElementById('time').value = "08:00";
           document.getElementById('input').value = "";
       }
   }

   // These event listeners handle adding new tasks when the enter key is pressed or the post button is clicked. The clear button event listener clears the task list and removes all tasks from local storage
   document.body.onkeydown = function(e) {
       // Add a new item when the enter key is pressed
       if (e.keyCode === 13) {
           newItem();
           document.getElementById('input').focus();
       }
   }

   document.getElementById('post-button').onclick = function() {
       // Add a new item when the post button is clicked
       newItem();
   }

   document.getElementById('clear-button').onclick = function() {
       // Clear the task list and local storage
       document.getElementById('list').innerHTML = '';
       localStorage.removeItem('tasks');
   } 