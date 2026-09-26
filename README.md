# Aurex Full-Stack Engineering Internship

## Intern Details

```
> Full Name: Amna Irfan
> Domain: Full-Stack Web Development
> Week: Week 4 – JavaScript Programming Fundamentals, DOM Manipulation, Events, Forms & localStorage
```

## Project

### Ledger — Task Management Application

For Week 4, I built "Ledger," a task management application using only
HTML5, CSS3, and Vanilla JavaScript. It supports adding, editing, deleting,
completing, and filtering tasks, with form validation and data
persistence via localStorage — tasks survive a page refresh.

## Live Deployment

```
Portfolio home  : https://zamirfan48-afk.github.io/aurex-web-internship-Amna/
Task Manager    : https://zamirfan48-afk.github.io/aurex-web-internship-Amna/task-manager/
Repository      : https://github.com/zamirfan48-afk/aurex-web-internship-Amna
```

## Demo

```
Task Manager App Demo video:  https://drive.google.com/file/d/1aEMMftXRvtXSFa4HY8qwvSPFFpTGpY_5/view?usp=drive_link
```

## Technologies Used

```
- HTML5
- CSS3 (custom properties, Flexbox, media queries)
- Vanilla JavaScript (ES6+)
- DOM APIs & localStorage
- Git & GitHub
- GitHub Pages
```

## Features Implemented

### Task Management
```
- Add a new task (text + priority: low / normal / high)
- Edit an existing task's text via a popup dialog
- Delete a task
- Mark a task complete / reopen it
- Filter tasks: All / Open / Closed
- "Clear closed" to bulk-remove completed tasks
```

### Form & Validation
```
- Blocks empty submissions with a visible error message
- Enforces a 120-character limit, enforced in JavaScript (not just the HTML input, so the validation logic is actually exercised)
- Error message clears automatically once the user starts retyping
```

### Data Persistence (localStorage)
```
- Every add/edit/delete/complete action saves the task list to localStorage
- JSON.stringify() converts the task array to text for storage
- JSON.parse() reads it back into real objects on page load
- A live "entries / open / closed" counter reflects the current state
```

### DOM & Events
```
- Elements selected with getElementById and querySelectorAll
- Task rows built and inserted dynamically with createElement/appendChild
- Event listeners for click (complete, edit, delete, filters), submit (add form), input (live error clearing), and
  keydown (Escape/Enter inside the edit dialog)
```

## JavaScript Exercises Completed

```
- Variables: let, const
- Data types & operators: strings, numbers, booleans, comparisons
- Conditionals: if / else / else if, used in validation and filtering
- Loops: for loops used throughout (counting, filtering, building the list)
- Functions: function declarations, plus one arrow function (isCompleted)
- Arrays: push, and manual array building with for loops
- Objects: each task is an object — { id, text, priority, completed, createdAt }
- ES6+:
    - Arrow function      -> isCompleted (used inside getCounts)
    - Template literal    -> building the priority tag's class name
    - Destructuring       -> reading { total, active, done } from getCounts()
```

## Project Structure

```
aurex-web-internship-Amna/
│
├── index.html                 (portfolio homepage — Weeks 1–3)
├── styles/
│   ├── main.css
│   └── animations.css
├── images/
│
├── task-manager/               (Week 4)
│   ├── index.html
│   ├── styles/
│   │   └── main.css
│   └── scripts/
│       └── main.js
│
└── README.md
```

## Live Testing

```
> Tested directly on the deployed GitHub Pages link (not just locally):
    - Add / edit / delete / complete / filter all confirmed working

    - Empty and over-120-character submissions correctly blocked, with
      a visible error message

    - Tasks persist correctly after a full page refresh

    - Layout remains usable down to mobile widths, no horizontal scroll
```

## Challenges & Learnings

```
- Understanding why the DOM needed to be fully re-drawn (render()) after
  every change, instead of trying to update single elements by hand

- Getting comfortable with localStorage — specifically remembering that
  it only stores strings, so JSON.stringify()/JSON.parse() are required

- Realizing the HTML `maxlength` attribute was silently blocking the
  character-limit test — the browser was enforcing the limit instead of
  my own JavaScript validation, so I removed it so my validateTaskText()
  function is the one actually doing the work
```

## Outcome

```
The Week 4 task manager applies core JavaScript fundamentals — variables,
conditionals, loops, functions, arrays, and objects — together with DOM
manipulation, event handling, form validation, and localStorage, resulting
in a fully working, refresh-proof browser application.
```

## Author

```
> Author:   Amna Irfan
> GitHub:   https://github.com/zamirfan48-afk
> Aurex Full-Stack Engineering Internship
```