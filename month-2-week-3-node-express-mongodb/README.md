# Month 2 – Week 3: Task Manager REST API

## Project Overview

A RESTful backend API developed using Node.js, Express.js, MongoDB, and Mongoose. The API supports creating, retrieving, updating, and deleting task records.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript
- Postman

## Features

- Create tasks
- Retrieve all tasks
- Retrieve a task by ID
- Update existing tasks
- Delete tasks
- Validate required task fields
- Handle invalid IDs and nonexistent tasks
- Store task records in MongoDB Atlas

## Project Structure

```text
month-2-week-3-node-express-mongodb/
├── config/
│   └── db.js
├── controllers/
│   └── taskController.js
├── models/
│   └── Task.js
├── routes/
│   └── taskRoutes.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Task Model

| Field | Description |
|---|---|
| title | Required task title |
| description | Task description |
| completed