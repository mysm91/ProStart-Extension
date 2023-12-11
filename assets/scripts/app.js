// Select DOM elements:
const toDo = document.querySelector(".to-do");
const toDoList = toDo.querySelector(".to-do-list");
const toDoForm = toDo.querySelector(".to-do-input-form");
const toDoInput = toDo.querySelector(".to-do-input");
const toDoAlert = toDo.querySelector(".to-do-alert-wrapper");
const toDoVisibility = toDo.querySelector(".to-do-visibility");
// const toDoDeleteButton = toDo.querySelector(".to-do-item"); ////
// const toDoDeleteOptions = toDo.querySelector(".to-do-delete-operation"); ////

const tasks = oldItems(); // Check local storage as the page loads
let taskId = null;

toDoVisibility.addEventListener("click", visibilityButtonHandler);

// Add a new task
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  taskRender();
  toDoInput.value = "";
  toDoInput.focus();
});

// Delete a task
toDo.addEventListener("click", (e) => {
  if (e.target.classList.contains("to-do-delete-icon")) {
    // e.target.querySelector(".to-do-delete-operation").style.transform =
    //   "scaleX(1)";
    e.target
      .querySelector(".to-do-delete-operation")
      .classList.toggle("show-delete-option");
  }

  if (e.target.classList.contains("task-delete-confirm")) {
    const datasetId = e.target.dataset.id;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == datasetId) {
        tasks.splice(i, 1);
      }
      localStorage.setItem("toDoItems", JSON.stringify(tasks));
    }
    e.target.parentElement.parentElement.parentElement.remove();
  }

  if (e.target.classList.contains("task-delete-cancel")) {
    e.target.parentElement.classList.toggle("show-delete-option");
  }

  // if mouse left the li element, to-do-delete-operation scale become 0 and then remove event listener
  // toDo.querySelector(".to-do-item").addEventListener("mouseleave", (e) => {
  //   console.log("hwuuu");
  // if (e.target.classList.contains("to-do-delete-operation")) {
  //   e.target.classList.remove("show-delete-option");
  //   toDo.removeEventListener("mouseleave", (e) => {
  //     e.target.classList.remove("show-delete-option");
  //   });
  // }
  // });
});

// toDo.addEventListener("mouseleave", (e) => {
//   if (e.target.classList.contains("to-do-item")) {
//     e.target
//       .querySelector(".to-do-delete-operation")
//       .classList.remove("show-delete-option");
//   }
//   // e.target.querySelector(".to-do-delete-operation").style.transform =
//   //   "scaleX(0)";
//   console.log("salam");
// });

function visibilityButtonHandler() {
  if (toDoVisibility.innerText === "visibility_off") {
    toDoVisibility.innerText = "visibility";
  } else {
    toDoVisibility.innerText = "visibility_off";
  }
}

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

// Create task element
function crateTaskElement(taskTitle, taskId) {
  const createTaskItem = document.createElement("li");
  const createTaskBox = document.createElement("div");
  const createTasKTitle = document.createElement("span");
  const createDeleteIcon = document.createElement("span");
  const createDeleteOptions = document.createElement("div");
  const confirmDeleteIcon = document.createElement("span");
  const cancelDeleteIcon = document.createElement("span");

  createTasKTitle.innerHTML = taskTitle;
  createDeleteIcon.innerHTML = "delete";
  confirmDeleteIcon.innerHTML = "check";
  cancelDeleteIcon.innerHTML = "close";

  createTaskItem.classList.add("to-do-item");
  createTaskBox.classList.add("to-do-box");
  createTasKTitle.classList.add("to-do-title");
  createDeleteIcon.classList.add(
    "material-symbols-outlined",
    "to-do-delete-icon"
  );
  createDeleteOptions.classList.add("to-do-delete-operation");
  confirmDeleteIcon.classList.add(
    "material-symbols-outlined",
    "task-delete-confirm"
  );
  cancelDeleteIcon.classList.add(
    "material-symbols-outlined",
    "task-delete-cancel"
  );

  createDeleteIcon.setAttribute("title", "Delete task");
  confirmDeleteIcon.setAttribute("title", "Confirm delete");
  cancelDeleteIcon.setAttribute("title", "Cancel delete");
  confirmDeleteIcon.setAttribute("data-id", taskId);

  toDoList.prepend(createTaskItem);
  createTaskItem.append(createTaskBox);
  createTaskItem.append(createTasKTitle);
  createTaskItem.append(createTasKTitle);
  createTaskItem.append(createDeleteIcon);
  createDeleteIcon.append(createDeleteOptions);
  createDeleteOptions.append(confirmDeleteIcon);
  createDeleteOptions.append(cancelDeleteIcon);
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

// Select DOM elements
const timeAndDateSection = document.querySelector(".time-wrapper");

// Receiving data from the API and pass them to DOM
const fetchTimeAndDate = async () => {
  try {
    const response = await fetch(
      "https://kaaryar0506reactblog.liara.run/current/time"
    );
    const data = await response.json();
    renderTimeAndDate(data);
  } catch (error) {
    console.log(error);
    timeAndDateSection.innerHTML =
      '<p class="time-weather-error">متاسفاته در حال حاضر اطلاعات مربوط به زمان و تقویم در دسترس نمی‌باشد 😟</p>';
  }
};

function renderTimeAndDate(data) {
  const {
    current,
    shamsi: { dayInMonth: shamsiDay, month: shamsiMonth },
    islamicHijri: {
      dayInMonth: hijriDay,
      month: hijriMonth,
      year: hijriYearFull,
    },
    miladi: {
      dayInMonth: christianDay,
      month: christianMonthFull,
      year: christianYear,
    },
  } = data;

  const timeZoneOffsetInMS = new Date().getTimezoneOffset() * 60000;
  const currentTimeZone = current - timeZoneOffsetInMS;
  const christianMonth = christianMonthFull.substring(0, 3);
  const hijriYear = hijriYearFull.substring(0, 4);

  timeAndDateSection.innerHTML = `
  <h2 class="time-digits">${msToTime(currentTimeZone)}</h2>
  <span class="date-shamsi">${shamsiDay} ${shamsiMonth}</span>
  <div class="date-other-calendar-wrapper">
    <span class="date-hijri">${hijriDay}/${hijriMonth}/${hijriYear}</span>
    <span class="time-vertical-bar"></span>
    <div class="date-christian">${christianYear}/${christianMonth}/${christianDay}</div>
  </div>
  <div class="timer-praying-timetable-wrapper">
    <select name="timer" class="timer">
      <option value="تایمر">تایمر</option>
    </select>
    <select name="oghat" class="praying-timetable">
      <option value="oghat">اوقات شرعی</option>
    </select>
  </div>`;
}

function msToTime(duration) {
  var minutes = Math.floor((duration / (1000 * 60)) % 60);
  var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes;
}

setTimeout(fetchTimeAndDate, 0);
setInterval(fetchTimeAndDate, 100000);

// Select DOM elements
const weatherSection = document.querySelector(".weather-wrapper");

// Receiving data from the API and pass them to DOM
const fetchWeather = async () => {
  try {
    const response = await fetch(
      "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light"
    );
    const data = await response.json();
    renderWeather(data);
  } catch (error) {
    console.log(error);
    weatherSection.innerHTML =
      '<p class="time-weather-error">متاسفاته در حال حاضر اطلاعات مربوط به آب‌وهوا در دسترس نمی‌باشد 😟</p>';
  }
};

function renderWeather(data) {
  const {
    current: currentTemp,
    customDescription: { emoji: descriptionEmoji, text: descriptionText },
    max,
    min,
    weather: { icon },
  } = data[0];

  const currentTempRound = Math.round(currentTemp);
  const maxTempRound = Math.round(max);
  const minTempRound = Math.round(min);

  weatherSection.innerHTML = `
  <div class="temperature-wrapper">
              <h2 class="temperature-digits">${currentTempRound}°</h2>
              <div class="temperature-emoji-wrapper">${weatherIcon("01n")}</div>
            </div>
            <div class="temperature-description-wrapper">
              <div class="temperature-description-text">${descriptionText}</div>
              <div class="temperature-description-emoji">${descriptionEmoji}</div>
            </div>
            <div class="temperature-min-max-wrapper">
              <div class="max-temperature-wrapper">
                <span class="max-temperature-digits">${maxTempRound}°</span>
                <span class="max-temperature-text">حداکثر</span>
              </div>
              <div class="min-max-separator">.</div>
              <div class="min-temperature-wrapper">
                <span class="min-temperature-digits">${minTempRound}°</span>
                <span class="min-temperature-text">حداقل</span>
              </div>
            </div>
            <select name="forecast" class="temperature-forecast">
              <option value="forecast">پیش‌بینی</option>
            </select>`;
}

function weatherIcon(iconCode) {
  return `<img src="./assets/images/weather/${iconCode}.svg" class="temperature-emoji">`;
}

setTimeout(fetchWeather, 0);
setInterval(fetchWeather, 600000);
