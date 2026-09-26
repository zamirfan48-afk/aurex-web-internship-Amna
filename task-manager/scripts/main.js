// ------------------------ Data we keep in memory ----------------------------

let entries = [];              // array of task objects
let currentFilter = "all";     // "all" | "active" | "completed"
let editingId = null;          // id of the entry being edited right now

const STORAGE_KEY = "ledger.entries";


// ----------------------- Grab the elements we need from the page ----------------------

const entryForm = document.getElementById("entryForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const formError = document.getElementById("formError");

const ledgerList = document.getElementById("ledgerList");
const emptyState = document.getElementById("emptyState");

const statTotal = document.getElementById("statTotal");
const statActive = document.getElementById("statActive");
const statDone = document.getElementById("statDone");

const filterButtons = document.querySelectorAll(".filter[data-filter]");
const clearCompletedBtn = document.getElementById("clearCompleted");

const editDialog = document.getElementById("editDialog");
const editInput = document.getElementById("editInput");
const editError = document.getElementById("editError");
const editSaveBtn = document.getElementById("editSave");
const editCancelBtn = document.getElementById("editCancel");

const todayDateEl = document.getElementById("todayDate");


// ==========================================================
//            Saving and loading (localStorage)
// ==========================================================

function saveEntries() {
  // Turn the array of objects into plain text so it can be stored
  const text = JSON.stringify(entries);
  localStorage.setItem(STORAGE_KEY, text);

}

function loadEntries() {

  const text = localStorage.getItem(STORAGE_KEY);

  if (text === null) {

    return []; // nothing saved before
  }

  return JSON.parse(text); // turn the text back into real objects
}


// ==========================================================
//              Creating and finding tasks
// ==========================================================

function createEntry(text, priority) {

  return {

    id: Date.now(),          // simple unique id based on current time
    text: text,
    priority: priority,      // "low", "normal", or "high"
    completed: false,
    createdAt: new Date().toISOString()

  };
}

function findEntry(id) {

  for (let i = 0; i < entries.length; i++) {

    if (entries[i].id === id) {
      return entries[i];
    }

  }
  return null;
}

// Arrow function: a short function written as (parameters) => expression
// This does the same job a normal function would, just in a shorter form
const isCompleted = (entry) => entry.completed === true;


// ==========================================================
//          Counting tasks for the stats bar
// ==========================================================

function getCounts() {

  let total = 0;
  let active = 0;
  let done = 0;

  for (let i = 0; i < entries.length; i++) {
    total = total + 1;

    if (isCompleted(entries[i])) {

      done = done + 1;

    } else {

      active = active + 1;
    }
  }

  return { total: total, active: active, done: done };
}


// ==========================================================
//        Deciding which tasks to display (filtering)
// ==========================================================

function getVisibleEntries() {
  const visible = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    if (currentFilter === "active" && entry.completed === true) {
      continue; // skip completed tasks
    }

    if (currentFilter === "completed" && entry.completed === false) {
      continue; // skip active tasks
    }

    visible.push(entry);
  }

  return visible;
}


// ==========================================================
//            Building the HTML for one task
// ==========================================================

function formatDate(isoString) {

  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}


function buildEntryElement(entry) {

  const li = document.createElement("li");
  li.className = "entry";

  if (entry.completed) {
    li.className = "entry is-done";
  }

  li.dataset.id = entry.id;



  // Checkmark button
  const checkBtn = document.createElement("button");
  checkBtn.type = "button";
  checkBtn.className = "entry__check";
  checkBtn.addEventListener("click", function () {

    toggleComplete(entry.id);
  });



  // Task text + meta row
  const body = document.createElement("div");
  body.className = "entry__body";


  const text = document.createElement("span");
  text.className = "entry__text";
  text.textContent = entry.text;


  const meta = document.createElement("div");
  meta.className = "entry__meta";


  const priorityTag = document.createElement("span");
  // Template literal: builds the class name using ${...} instead of + concatenation
  priorityTag.className = `entry__priority entry__priority--${entry.priority}`;
  priorityTag.textContent = entry.priority;


  const dateTag = document.createElement("span");
  dateTag.textContent = formatDate(entry.createdAt);


  meta.appendChild(priorityTag);
  meta.appendChild(dateTag);


  body.appendChild(text);
  body.appendChild(meta);




  // Edit + delete buttons

  const actions = document.createElement("div");
  actions.className = "entry__actions";


  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "entry__action entry__action--edit";
  editBtn.textContent = "Edit";

  editBtn.addEventListener("click", function () {

    openEditDialog(entry.id);
  });


  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "entry__action entry__action--delete";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", function () {

    handleDelete(entry.id);
  });


  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);


  li.appendChild(checkBtn);
  li.appendChild(body);
  li.appendChild(actions);


  return li;
}



// ==========================================================
//          Drawing the page (DOM manipulation)
// ==========================================================

function renderList() {
  ledgerList.innerHTML = ""; // clear the list first

  const visible = getVisibleEntries();

  if (visible.length === 0) {

    emptyState.classList.add("visible");

  } else {

    emptyState.classList.remove("visible");
  }


  for (let i = 0; i < visible.length; i++) {

    const entryElement = buildEntryElement(visible[i]);
    ledgerList.appendChild(entryElement);

  }
}


function renderStats() {
  // Destructuring: pulls total/active/done straight out of the
  // object getCounts() returns, instead of writing counts.total,
  // counts.active, counts.done separately
  const { total, active, done } = getCounts();
  statTotal.textContent = total;
  statActive.textContent = active;
  statDone.textContent = done;
}

function render() {

  renderList();
  renderStats();
}


// ==========================================================
//  Actions: add, complete, delete, edit, clear completed
// ==========================================================

function addEntry(text, priority) {

  const newEntry = createEntry(text.trim(), priority);
  entries.push(newEntry);
  saveEntries();
  render();
}


function toggleComplete(id) {

  const entry = findEntry(id);
  if (entry === null) return;

  entry.completed = !entry.completed;
  saveEntries();
  render();
}


function handleDelete(id) {
  const remaining = [];

  for (let i = 0; i < entries.length; i++) {

    if (entries[i].id !== id) {

      remaining.push(entries[i]);
    }
  }

  entries = remaining;
  saveEntries();
  render();
}

function updateEntryText(id, newText) {
  const entry = findEntry(id);

  if (entry === null) return;

  entry.text = newText.trim();
  saveEntries();
  render();
}

function clearCompleted() {
  const remaining = [];

  for (let i = 0; i < entries.length; i++) {

    if (entries[i].completed === false) {
      remaining.push(entries[i]);
    }
  }

  entries = remaining;
  saveEntries();
  render();
}


// ==========================================================
//                     Form validation
// ==========================================================

function validateTaskText(text) {

  if (text.trim().length === 0) {
    return "An entry can't be empty.";
  }

  if (text.trim().length > 120) {
    return "Keep entries under 120 characters.";
  }

  return ""; // no error
}


// ==========================================================
//                    Event listeners
// ==========================================================

entryForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const text = taskInput.value;
  const error = validateTaskText(text);

  if (error !== "") {
    formError.textContent = error;
    return;
  }

  formError.textContent = "";
  addEntry(text, priorityInput.value);

  taskInput.value = "";
  priorityInput.value = "normal";
  taskInput.focus();
});


taskInput.addEventListener("input", function () {

  if (formError.textContent !== "") {
    formError.textContent = "";
  }

});


filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(function (b) {
      b.classList.remove("active");
    });

    button.classList.add("active");

    renderList();
  });
});


clearCompletedBtn.addEventListener("click", clearCompleted);

// ---- Edit dialog ----

function openEditDialog(id) {
  const entry = findEntry(id);

  if (entry === null) return;

  editingId = id;
  editInput.value = entry.text;
  editError.textContent = "";
  editDialog.hidden = false;
  editInput.focus();
}


function closeEditDialog() {
  editDialog.hidden = true;
  editingId = null;
}


editSaveBtn.addEventListener("click", function () {
  const error = validateTaskText(editInput.value);

  if (error !== "") {
    editError.textContent = error;
    return;
  }

  updateEntryText(editingId, editInput.value);
  closeEditDialog();
});

editCancelBtn.addEventListener("click", closeEditDialog);


editInput.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {
    closeEditDialog();

  } else if (event.key === "Enter") {
    editSaveBtn.click();
  }
});



// ==========================================================
//      Run this once, when the page first loads
// ==========================================================

function setTodayDate() {
  const today = new Date();
  todayDateEl.textContent = today.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
}

function init() {
  entries = loadEntries();
  setTodayDate();
  render();
}

init();