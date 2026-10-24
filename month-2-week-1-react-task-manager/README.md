# Aurex Full-Stack Engineering Internship

## Intern Details

```
> Full Name: Amna Irfan
> Domain: Full-Stack Web Development
> Month: Month 2
> Week: Week 1 – React.js Fundamentals & Component Architecture
```

## Project

### DECK — Focused Task Manager

DECK recreates the internship task manager as a responsive React and Vite
application. It includes task planning, a date-aware agenda and calendar,
theme switching, and a configurable focus timer.

## Live Deployment

```
React Task Manager : https://zamirfan48-afk.github.io/aurex-web-internship-Amna/react-task-manager/
Repository         : https://github.com/zamirfan48-afk/aurex-web-internship-Amna
Project source     : https://github.com/zamirfan48-afk/aurex-web-internship-Amna/tree/main/month-2-week-1-react-task-manager
```

## Technologies Used

```
- React
- JavaScript (ES modules)
- Vite
- HTML5
- CSS3
- ESLint
- Git & GitHub
- GitHub Pages
```

## Features Implemented

### Task Management
```
- Add tasks with due date, optional time, and low / normal / high priority
- Filter the task list by all, today, upcoming, and completed tasks
- Mark tasks complete, reopen them, or delete them
- View scheduled tasks in a date-aware daily agenda
- Navigate a monthly calendar, with indicators for scheduled tasks
```

### Form & Validation
```
- Prevent empty, whitespace-only, and over-120-character task submissions
- Show a visible validation message
- Clear the validation message when the user starts typing
- Clear the input after a valid task is added
```

### State & Data Flow
```
- App owns the shared task array with useState and persists it in localStorage
- TaskForm owns its input and validation state
- App passes task data, current calendar selection, and event-handler functions to child components
- TaskForm calls onAddTask to send new task text to App
- TaskItem calls parent handlers to complete or delete a task
- State arrays and task objects are updated immutably
```

The dashboard also has a live clock, a persistent light / dark theme preference,
and a focus timer with 15, 25, and 45-minute presets.

## Build It Step by Step

1. **Create the Vite app.** Scaffold a React project, install dependencies,
   and add the `dev`, `build`, and `lint` scripts.
2. **Split the interface into components.** Build `Header`, `TaskForm`,
   `TaskList`, `TaskItem`, `Calendar`, and `FocusTimer`; mount them from `App`.
3. **Model task data.** Store tasks as objects with an id, text, due date,
   optional time, priority, and completion state.
4. **Wire task interactions.** Keep the task array in `App`, then pass callbacks
   to child components for adding, completing, deleting, and filtering tasks.
5. **Add the calendar and agenda.** Generate the selected month’s date grid and
   derive the agenda from tasks scheduled for the selected date.
6. **Add persistence and controls.** Save tasks and theme preference to
   `localStorage`; implement the live clock and interval-based focus timer.
7. **Style and verify.** Apply responsive styles, accessible labels and focus
   states, then run `npm run lint` and `npm run build`.

## React Concepts Practiced

```
- JSX and JavaScript expressions
- Functional components and component hierarchy
- useState for reactive UI state
- Props for parent-to-child data flow
- Callback props for child-to-parent communication
- Controlled inputs and form submission events
- Conditional rendering for validation, task filters, agenda, and empty states
- Array map() with stable keys for list rendering
- Immutable array updates with map() and filter()
- Derived UI using useMemo and timer effects with useEffect
```

## Project Structure

```
month-2-week-1-react-task-manager/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── components/
        ├── Header.jsx
        ├── TaskForm.jsx
        ├── TaskList.jsx
        ├── TaskItem.jsx
        ├── Calendar.jsx
        └── FocusTimer.jsx
```

### Component Hierarchy

```
App
├── Header
├── TaskForm
├── TaskList
│   └── TaskItem
├── Calendar
└── FocusTimer
```

## Run Locally

```
npm install
npm run dev
```

## Quality Checks

```
npm run lint
npm run build
```

## Live Testing

```
> Test locally using the checks above. Task data persists across refreshes.
```

## Challenges & Learnings

```
- Lifting the shared task state to App so the form and list stay in sync
- Passing callback functions through props for child-to-parent actions
- Updating arrays and objects immutably so React re-renders correctly
- Using controlled inputs to keep form values in React state
- Adding stable keys when rendering a list with map()
```

## Outcome

```
The project applies React fundamentals to a responsive task manager and adds
useful daily planning tools, local persistence, and a focus timer.
```

## Author

```
> Author:   Amna Irfan
> GitHub:   https://github.com/zamirfan48-afk
> Aurex Full-Stack Engineering Internship
```
