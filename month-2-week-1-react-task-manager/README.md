# Aurex Full-Stack Engineering Internship

## Intern Details

```
> Full Name: Amna Irfan
> Domain: Full-Stack Web Development
> Month: Month 2
> Week: Week 1 – React.js Fundamentals & Component Architecture
```

## Project

### React Task Manager

For Month 2, Week 1, I rebuilt the core task-management workflow as a
component-driven React application using Vite and JavaScript. The project
focuses on functional components, JSX, `useState`, props, event handling,
controlled inputs, and rendering lists.

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
- Add tasks using a controlled form input
- Display tasks dynamically from React state
- Mark tasks complete and active
- Delete tasks
- Show an empty-list message when there are no tasks
```

### Form & Validation
```
- Prevent empty and whitespace-only task submissions
- Show a visible validation message
- Clear the validation message when the user starts typing
- Clear the input after a valid task is added
```

### State & Data Flow
```
- App owns the shared task array with useState
- TaskForm owns its input and validation state
- App passes task data and event-handler functions to child components
- TaskForm calls onAddTask to send new task text to App
- TaskItem calls parent handlers to complete or delete a task
- State arrays and task objects are updated immutably
```

> Tasks are kept in React state only. Refreshing the page resets the list;
> localStorage persistence is not part of the Week 1 requirements.

## React Concepts Practiced

```
- JSX and JavaScript expressions
- Functional components and component hierarchy
- useState for reactive UI state
- Props for parent-to-child data flow
- Callback props for child-to-parent communication
- Controlled inputs and form submission events
- Conditional rendering for validation and the empty state
- Array map() with stable keys for list rendering
- Immutable array updates with map() and filter()
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
        └── TaskItem.jsx
```

### Component Hierarchy

```
App
├── Header
├── TaskForm
└── TaskList
    └── TaskItem
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
> Tested on the deployed GitHub Pages app:
    - Adding a task displays it in the list
    - Empty and whitespace-only submissions show validation
    - Tasks can be marked complete and active
    - Tasks can be deleted
    - Refreshing resets tasks, as expected for React state without persistence
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
The project applies React fundamentals to a working task manager. It
demonstrates reusable components, state ownership, props, controlled form
handling, validation, conditional UI, and dynamic list rendering.
```

## Author

```
> Author:   Amna Irfan
> GitHub:   https://github.com/zamirfan48-afk
> Aurex Full-Stack Engineering Internship
```
