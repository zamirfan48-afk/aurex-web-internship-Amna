// ==========================================================
//              THEME TOGGLE (dark / light)
// ==========================================================

const themeBtn = document.getElementById("themeBtn");

function applyTheme(themeName) {
  if (themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

// Load whatever theme was saved last time (if any)
try {
  const savedTheme = localStorage.getItem("deck.theme");
  applyTheme(savedTheme);
} catch (err) {

}

themeBtn.addEventListener("click", function () {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);

  try {
    localStorage.setItem("deck.theme", next);
  } catch (err) {
    // ignore if storage isn't available
  }
});


// ==========================================================
//                 GREETING + DIGITAL CLOCK
// ==========================================================

function setGreeting() {
  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = "GOOD MORNING";
  } else if (hour < 18) {
    greeting = "GOOD AFTERNOON";
  } else {
    greeting = "GOOD EVENING";
  }

  document.getElementById("greeting").textContent = greeting;
}

function pad(number) {
  // turns 5 into "05"
  return String(number).padStart(2, "0");
}

function tickClock() {
  const now = new Date();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  document.getElementById("bigClock").innerHTML =
    hours + ":" + minutes + '<span class="sec">:' + seconds + "</span>";

  document.getElementById("bigDate").textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

setGreeting();
tickClock();
setInterval(tickClock, 1000);


// ==========================================================
//           TASK DATA (stored in localStorage)
// ==========================================================

const TASKS_KEY = "deck.tasks";
let tasks = [];
let currentFilter = "all";

function loadTasks() {
  const saved = localStorage.getItem(TASKS_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

function saveTasks() {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function todayString() {
  // e.g. "2026-09-26"
  return new Date().toISOString().slice(0, 10);
}

// If there's nothing saved yet, start with a few sample tasks
tasks = loadTasks();
if (tasks.length === 0) {
  const today = todayString();
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  tasks = [
    { id: 1, text: "Review physics notes", date: today, time: "11:00", priority: "normal", completed: false },
    { id: 2, text: "Finish math assignment", date: today, time: "09:00", priority: "high", completed: true },
    { id: 3, text: "Prepare chemistry lab", date: tomorrow, time: "10:00", priority: "high", completed: false },
    { id: 4, text: "Read 30 pages", date: "", time: "", priority: "low", completed: false }
  ];
  saveTasks();
}


// ==========================================================
//                       SMALL HELPERS
// ==========================================================

function escapeHtml(text) {
  // Prevents anything the user types from being read as HTML
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatShortDate(dateString) {
  if (dateString === "") {
    return "";
  }
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}


// ==========================================================
//           FILTERING TASKS FOR TASK LISTS
// ==========================================================

function getFilteredTasks() {
  const today = todayString();
  const result = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (currentFilter === "today") {
      if (task.date === today && task.completed === false) {
        result.push(task);
      }
    } else if (currentFilter === "upcoming") {
      if (task.date !== "" && task.date > today && task.completed === false) {
        result.push(task);
      }
    } else if (currentFilter === "completed") {
      if (task.completed === true) {
        result.push(task);
      }
    } else {
      // "all"
      result.push(task);
    }
  }

  return result;
}


// ==========================================================
//                RENDERING THE TASK LIST
// ==========================================================

function renderTaskList() {
  const listEl = document.getElementById("taskList");
  const visibleTasks = getFilteredTasks();

  listEl.innerHTML = "";

  if (visibleTasks.length === 0) {
    listEl.innerHTML = '<p class="empty">Nothing here.</p>';
    return;
  }

  for (let i = 0; i < visibleTasks.length; i++) {
    const task = visibleTasks[i];

    let metaText = "";
    if (task.date !== "") {
      metaText = formatShortDate(task.date);
      if (task.time !== "") {
        metaText = metaText + " · " + task.time;
      }
    }

    const row = document.createElement("div");
    row.className = "task" + (task.completed ? " done" : "");
    row.innerHTML =
      '<button class="check" data-id="' + task.id + '"></button>' +
      '<div class="body">' +
      '<div class="txt">' + escapeHtml(task.text) + "</div>" +
      '<div class="meta">' + metaText + '<span class="pill ' + task.priority + '">' + task.priority + "</span></div>" +
      "</div>" +
      '<button class="del" data-id="' + task.id + '">✕</button>';

    listEl.appendChild(row);
  }
}


// ==========================================================
//             RENDERING 'TODAYs' SCHEDULE
// ==========================================================

function renderSchedule() {
  const listEl = document.getElementById("schedList");
  const today = todayString();

  // Only tasks scheduled for today
  const todaysTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].date === today) {
      todaysTasks.push(tasks[i]);
    }
  }

  // Sort by time (earliest first)
  todaysTasks.sort(function (a, b) {
    return a.time.localeCompare(b.time);
  });

  listEl.innerHTML = "";

  if (todaysTasks.length === 0) {
    listEl.innerHTML = '<p class="sched-empty">Nothing scheduled today.</p>';
    return;
  }

  for (let i = 0; i < todaysTasks.length; i++) {
    const task = todaysTasks[i];
    const row = document.createElement("div");
    row.className = "sched-item p-" + task.priority + (task.completed ? " done" : "");
    row.innerHTML =
      '<div class="time mono">' + (task.time || "--:--") + "</div>" +
      '<div class="txt">' + escapeHtml(task.text) + "</div>";
    listEl.appendChild(row);
  }
}


// ==========================================================
//          ADDING, COMPLETEING & DELETING TASKS
// ==========================================================

document.getElementById("addForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const textInput = document.getElementById("taskText");
  const text = textInput.value.trim();
  if (text === "") {
    return;
  }

  const date = document.getElementById("taskDate").value;
  const priority = document.getElementById("taskPriority").value;

  tasks.push({
    id: Date.now(),
    text: text,
    date: date,
    time: "",
    priority: priority,
    completed: false
  });

  saveTasks();
  textInput.value = "";
  document.getElementById("taskDate").value = "";

  renderEverything();
});

// One click listener on the whole list handles every checkbox/delete button
document.getElementById("taskList").addEventListener("click", function (event) {
  const clickedId = Number(event.target.dataset.id);
  if (!clickedId) {
    return;
  }

  if (event.target.classList.contains("check")) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === clickedId) {
        tasks[i].completed = !tasks[i].completed;
      }
    }
    saveTasks();
    renderEverything();
  }

  if (event.target.classList.contains("del")) {
    const remaining = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== clickedId) {
        remaining.push(tasks[i]);
      }
    }
    tasks = remaining;
    saveTasks();
    renderEverything();
  }
});


// ==========================================================
//     FILTERING TABS (All / Today / Upcoming / Done)
// ==========================================================

document.getElementById("tabs").addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  currentFilter = event.target.dataset.f;

  const allTabButtons = document.querySelectorAll("#tabs button");
  for (let i = 0; i < allTabButtons.length; i++) {
    allTabButtons[i].classList.remove("active");
  }
  event.target.classList.add("active");

  renderTaskList();
});


// ==========================================================
//                        CALENDAR
// ==========================================================

let calendarViewDate = new Date();

function renderCalendar() {
  const grid = document.getElementById("calGrid");
  const label = document.getElementById("monthLabel");

  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();

  label.textContent = calendarViewDate
    .toLocaleDateString(undefined, { month: "short", year: "numeric" })
    .toUpperCase();

  grid.innerHTML = "";

  // Day-of-week headers
  const dayLetters = ["S", "M", "T", "W", "T", "F", "S"];
  for (let i = 0; i < dayLetters.length; i++) {
    const el = document.createElement("div");
    el.className = "dow";
    el.textContent = dayLetters[i];
    grid.appendChild(el);
  }

  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = todayString();

  // Collect every date (yyyy-mm-dd) that has at least one task
  const datesWithTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].date !== "" && datesWithTasks.indexOf(tasks[i].date) === -1) {
      datesWithTasks.push(tasks[i].date);
    }
  }

  // Leading grey days from the previous month
  for (let i = 0; i < startOffset; i++) {
    const el = document.createElement("div");
    el.className = "day muted";
    el.textContent = daysInPrevMonth - startOffset + i + 1;
    grid.appendChild(el);
  }

  // The actual days of this month
  for (let day = 1; day <= daysInMonth; day++) {
    const el = document.createElement("div");
    const iso = year + "-" + pad(month + 1) + "-" + pad(day);

    let className = "day";
    if (iso === today) {
      className += " today";
    }
    if (datesWithTasks.indexOf(iso) !== -1) {
      className += " has-task";
    }

    el.className = className;
    el.textContent = day;
    grid.appendChild(el);
  }

  // Trailing grey days so the grid ends on a full week
  const totalCellsSoFar = startOffset + daysInMonth;
  const trailingDays = (7 - (totalCellsSoFar % 7)) % 7;
  for (let i = 1; i <= trailingDays; i++) {
    const el = document.createElement("div");
    el.className = "day muted";
    el.textContent = i;
    grid.appendChild(el);
  }
}

document.getElementById("prevMonth").addEventListener("click", function () {
  calendarViewDate.setMonth(calendarViewDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", function () {
  calendarViewDate.setMonth(calendarViewDate.getMonth() + 1);
  renderCalendar();
});


// ==========================================================
//                      FOCUS TIMER
// ==========================================================

let totalSeconds = 25 * 60;
let secondsLeft = totalSeconds;
let timerIsRunning = false;
let timerIntervalId = null;

const ringEl = document.getElementById("ring");
const timerNumEl = document.getElementById("timerNum");
const timerLabelEl = document.getElementById("timerLbl");
const playButton = document.getElementById("tPlay");

function renderTimer() {
  const minutes = pad(Math.floor(secondsLeft / 60));
  const seconds = pad(secondsLeft % 60);
  timerNumEl.textContent = minutes + ":" + seconds;

  const percentDone = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100);
  ringEl.style.setProperty("--pct", percentDone);

  if (timerIsRunning) {
    timerLabelEl.textContent = "FOCUSING";
  } else if (secondsLeft === 0) {
    timerLabelEl.textContent = "DONE";
  } else {
    timerLabelEl.textContent = "READY";
  }
}

renderTimer();

playButton.addEventListener("click", function () {
  if (timerIsRunning) {
    // currently running -> pause it
    timerIsRunning = false;
    clearInterval(timerIntervalId);
    playButton.textContent = "▶ Start";
  } else {
    // currently paused/finished -> start it
    if (secondsLeft === 0) {
      secondsLeft = totalSeconds;
    }
    timerIsRunning = true;
    playButton.textContent = "⏸ Pause";

    timerIntervalId = setInterval(function () {
      secondsLeft = secondsLeft - 1;

      if (secondsLeft <= 0) {
        secondsLeft = 0;
        timerIsRunning = false;
        clearInterval(timerIntervalId);
        playButton.textContent = "▶ Start";
      }

      renderTimer();
    }, 1000);
  }

  renderTimer();
});

document.getElementById("tReset").addEventListener("click", function () {
  timerIsRunning = false;
  clearInterval(timerIntervalId);
  playButton.textContent = "▶ Start";
  secondsLeft = totalSeconds;
  renderTimer();
});

document.getElementById("tSkip").addEventListener("click", function () {
  timerIsRunning = false;
  clearInterval(timerIntervalId);
  playButton.textContent = "▶ Start";
  secondsLeft = 0;
  renderTimer();
});

document.getElementById("presets").addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  const allPresetButtons = document.querySelectorAll("#presets button");
  for (let i = 0; i < allPresetButtons.length; i++) {
    allPresetButtons[i].classList.remove("active");
  }
  event.target.classList.add("active");

  totalSeconds = Number(event.target.dataset.min) * 60;
  secondsLeft = totalSeconds;
  timerIsRunning = false;
  clearInterval(timerIntervalId);
  playButton.textContent = "▶ Start";
  renderTimer();
});


// ==========================================================
//              RUN EVERYTHING ONCE, IN PAGE LOAD
// ==========================================================

function renderEverything() {
  renderTaskList();
  renderSchedule();
  renderCalendar();
}

renderEverything();