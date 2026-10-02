# React Task Manager — Week 1

A component-driven task manager built with React and Vite for the AUREX Internship Program. This project recreates the core task workflow using React state, props, and event handling.

## Live Demo

https://zamirfan48-afk.github.io/aurex-web-internship-Amna/react-task-manager/

## Features

- Add tasks with a controlled form input
- Prevent empty or whitespace-only tasks
- Display tasks dynamically
- Mark tasks complete or active
- Delete tasks
- Responsive layout

> Tasks are stored in React state only. Refreshing the page resets the list; persistence is not part of the Week 1 requirements.

## Component Architecture

```text
App
├── Header
├── TaskForm
└── TaskList
└── TaskItem