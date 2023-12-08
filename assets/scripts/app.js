// Select DOM elements:
const toDo = document.querySelector(".to-do");
const toDoList = toDo.querySelector(".to-do-list");
const toDoForm = toDo.querySelector(".to-do-input-form");
const toDoInput = toDo.querySelector(".to-do-input");
const toDoAlert = toDo.querySelector(".to-do-alert-wrapper");

const tasks = oldItems(); // Check local storage as the page loads
let taskId;

// Add a new task
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  taskRender();
  toDoInput.value = "";
  toDoInput.focus();
});

// Validation of input value and render task
function taskRender() {
  const taskInputValue = toDoInput.value.trim();
  setTaskId();

  if (!taskInputValue) {
    toDoAlertHandler();
  } else {
    crateTaskElement(taskInputValue, taskId);
    addTaskToStorage(taskInputValue);
  }
}

// Delete a task
toDo.addEventListener("click", (e) => {
  if (e.target.classList.contains("to-do-delete-icon")) {
    const datasetId = e.target.dataset.id;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == datasetId) {
        tasks.splice(i, 1);
      }
      localStorage.setItem("toDoItems", JSON.stringify(tasks));
    }
    e.target.parentElement.parentElement.remove();
  }
});

// Create task element
function crateTaskElement(taskTitle, taskId) {
  const createTaskItem = document.createElement("li");
  const createTaskBox = document.createElement("div");
  const createTasKTitle = document.createElement("span");
  const createTaskIconWrapper = document.createElement("div");
  const createEditIcon = document.createElement("span");
  const createDeleteIcon = document.createElement("span");

  createTasKTitle.innerHTML = taskTitle;
  createEditIcon.innerHTML = "edit";
  createDeleteIcon.innerHTML = "delete";

  createTaskItem.classList.add("to-do-item");
  createTaskBox.classList.add("to-do-box");
  createTasKTitle.classList.add("to-do-title");
  createTaskIconWrapper.classList.add("to-do-icon-wrapper");
  createEditIcon.classList.add("material-symbols-outlined", "to-do-edit-icon");
  createDeleteIcon.classList.add(
    "material-symbols-outlined",
    "to-do-delete-icon"
  );

  createDeleteIcon.setAttribute("data-id", taskId);

  toDoList.prepend(createTaskItem);
  createTaskItem.append(createTaskBox);
  createTaskItem.append(createTasKTitle);
  createTaskItem.append(createTasKTitle);
  createTaskItem.append(createTaskIconWrapper);
  createTaskIconWrapper.append(createEditIcon);
  createTaskIconWrapper.append(createDeleteIcon);
}

// Show/hide alert message
function toDoAlertHandler() {
  toDoAlert.style.visibility = "visible";
  toDoAlert.style.opacity = "1";
  toDoAlert.style.transform = "translateY(-130%)";

  setTimeout(() => {
    toDoAlert.style.visibility = "hidden";
    toDoAlert.style.opacity = "0";
    toDoAlert.style.transform = "translateY(0)";
  }, 3000);
}

// Save added task to the Local Storage
function addTaskToStorage(currentTaskTitle) {
  setTaskId();
  const newTaskItem = {
    id: taskId,
    title: currentTaskTitle,
  };

  tasks.push(newTaskItem);
  localStorage.setItem("toDoItems", JSON.stringify(tasks));
}

// Load tasks from Local Storage
function oldItems() {
  let oldTasks = JSON.parse(localStorage.getItem("toDoItems"));
  if (oldTasks == null) {
    return [];
  }
  return oldTasks;
}

// Render loaded tasks from local storage into DOM
for (let task of tasks) {
  crateTaskElement(task.title, task.id);
}

// Assign ID for each task based on current time for each task
function setTaskId() {
  let uniqueId = new Date();
  taskId = Math.ceil(uniqueId.getTime() / 100);
}
