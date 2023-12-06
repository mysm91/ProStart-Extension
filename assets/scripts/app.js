// Select DOM elements:
const toDo = document.querySelector(".to-do");
const toDoList = toDo.querySelector(".to-do-list");
const toDoForm = toDo.querySelector(".to-do-input-form");
const toDoInput = toDo.querySelector(".to-do-input");
const toDoAlert = toDo.querySelector(".to-do-alert-wrapper");

// Add a new task
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  taskRender();
  toDoInput.value = "";
});

// Validation of input value and render task
function taskRender() {
  const taskInputValue = toDoInput.value.trim();

  if (!taskInputValue) {
    toDoAlertHandler();
  } else {
    crateTaskElement(taskInputValue);
  }
}

// Delete a task
toDo.addEventListener("click", (e) => {
  if (e.target.classList.contains("to-do-delete-icon")) {
    e.target.parentElement.parentElement.remove();
  }
});

// Create task element
function crateTaskElement(taskTitle) {
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
