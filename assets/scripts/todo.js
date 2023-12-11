// Select DOM elements:
const toDo = document.querySelector(".to-do");
const toDoList = toDo.querySelector(".to-do-list");
const toDoForm = toDo.querySelector(".to-do-input-form");
const toDoInput = document.getElementById("to-do-input");
const toDoAlert = toDo.querySelector(".to-do-alert-wrapper");
const toDoVisibility = toDo.querySelector(".to-do-visibility");

const tasks = previousItems(); // Check local storage as the page loads to load previous tasks
let taskId = null;

// Change the visibility of the to-do tasks event
toDoVisibility.addEventListener("click", visibilityButtonHandler);

// Add a new task event
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  taskRender();

  toDoInput.value = "";
  toDoInput.focus();
});

// Delete a task event
toDo.addEventListener("click", (e) => {
  const containClass = e.target.classList;
  if (containClass.contains("to-do-delete-icon")) {
    e.target
      .querySelector(".to-do-delete-operation")
      .classList.toggle("show-delete-option");
  }

  // Confirm deletion of a task
  if (containClass.contains("task-delete-confirm")) {
    const datasetId = e.target.dataset.id;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == datasetId) {
        tasks.splice(i, 1);
      }
      // Save the changes in the local storage
      localStorage.setItem("toDoItems", JSON.stringify(tasks));
    }
    // Remove the task element from the DOM
    e.target.parentElement.parentElement.parentElement.remove();
  }

  // Cancel deletion of a task
  if (containClass.contains("task-delete-cancel")) {
    e.target.parentElement.classList.toggle("show-delete-option");
  }
});

// visible/invisible the task list function
function visibilityButtonHandler() {
  let toDoListStyle = toDoList.style;

  if (toDoVisibility.innerText === "visibility_off") {
    toDoVisibility.innerText = "visibility";
    toDoListStyle.filter = "blur(3px)";
  } else {
    toDoVisibility.innerText = "visibility_off";
    toDoListStyle.filter = "unset";
  }
}

// Validation of input value and render task
function taskRender() {
  const taskInputValue = toDoInput.value.trim();

  setTaskId();

  if (!taskInputValue) {
    toDoAlertHandler();
  } else {
    createTaskElement(taskInputValue, taskId);
    addTaskToStorage(taskInputValue);
  }
}

// Create task element
function createTaskElement(taskTitle, taskId) {
  // Create required elements
  const createTaskItem = document.createElement("li");
  const createTaskBox = document.createElement("div");
  const createTasKTitle = document.createElement("span");
  const createDeleteIcon = document.createElement("span");
  const createDeleteOptions = document.createElement("div");
  const confirmDeleteIcon = document.createElement("span");
  const cancelDeleteIcon = document.createElement("span");

  // Add required text to the created elements
  createTasKTitle.innerHTML = taskTitle;
  createDeleteIcon.innerHTML = "delete";
  confirmDeleteIcon.innerHTML = "check";
  cancelDeleteIcon.innerHTML = "close";

  // Add class(es) to the created elements
  addClass(createTaskItem, "to-do-item");
  addClass(createTaskBox, "to-do-box");
  addClass(createTasKTitle, "to-do-title");
  addClass(createDeleteIcon, "material-symbols-outlined");
  addClass(createDeleteIcon, "to-do-delete-icon");
  addClass(createDeleteOptions, "to-do-delete-operation");
  addClass(confirmDeleteIcon, "material-symbols-outlined");
  addClass(confirmDeleteIcon, "task-delete-confirm");
  addClass(cancelDeleteIcon, "material-symbols-outlined");
  addClass(cancelDeleteIcon, "task-delete-cancel");

  // Set the required attributes to the created elements
  createDeleteIcon.setAttribute("title", "Delete task");
  confirmDeleteIcon.setAttribute("title", "Confirm delete");
  cancelDeleteIcon.setAttribute("title", "Cancel delete");
  confirmDeleteIcon.setAttribute("data-id", taskId);

  // Append/prepend created elements to determine the parents and children
  toDoList.prepend(createTaskItem);
  appendElement(createTaskItem, createTaskBox);
  appendElement(createTaskItem, createTasKTitle);
  appendElement(createTaskItem, createDeleteIcon);
  appendElement(createDeleteIcon, createDeleteOptions);
  appendElement(createDeleteOptions, confirmDeleteIcon);
  appendElement(createDeleteOptions, cancelDeleteIcon);
}

// Show/hide alert message
function toDoAlertHandler() {
  const toDoAlertStyle = toDoAlert.style;

  toDoAlertStyle.visibility = "visible";
  toDoAlertStyle.opacity = "1";
  toDoAlertStyle.transform = "translateY(-130%)";

  setTimeout(() => {
    toDoAlertStyle.visibility = "hidden";
    toDoAlertStyle.opacity = "0";
    toDoAlertStyle.transform = "translateY(0)";
  }, 3000);
}

// Save added task to the local storage
function addTaskToStorage(currentTaskTitle) {
  setTaskId();

  const newTaskItem = {
    id: taskId,
    title: currentTaskTitle,
  };

  tasks.push(newTaskItem);
  localStorage.setItem("toDoItems", JSON.stringify(tasks));
}

// Load tasks from local storage
function previousItems() {
  let oldTasks = JSON.parse(localStorage.getItem("toDoItems"));
  if (oldTasks == null) {
    return [];
  }
  return oldTasks;
}

// Render loaded tasks from local storage into the DOM
for (let task of tasks) {
  createTaskElement(task.title, task.id);
}

// Assign ID for each task based on current time
function setTaskId() {
  let uniqueId = new Date();
  taskId = Math.ceil(uniqueId.getTime() / 100);
}

// Add class to the elements
function addClass(element, className) {
  element.classList.add(className);
}

// Append elements to their parents
function appendElement(parent, child) {
  parent.append(child);
}
