# Month 2 – Week 4: Authenticated Task Manager

## Project Overview
A full-stack task management application with user registration, login, JWT authentication, and user-specific task management.

## Technologies
- React and Vite
- Node.js and Express.js
- MongoDB Atlas and Mongoose
- JWT authentication
- bcryptjs
- HTML and CSS

## Features
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Create, view, update, and delete tasks
- Mark tasks as completed or pending
- Task priorities
- User-specific task access
- Responsive interface

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get logged-in user |
| GET | `/api/tasks` | Get user's tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Task endpoints require a valid JWT in the Authorization header.

## Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Configure the backend `.env` with `PORT`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, and `CLIENT_URL`. Configure the frontend `.env` with `VITE_API_URL`.

## Security
Passwords are hashed using bcryptjs. JWT middleware protects private endpoints. Task queries are restricted to the authenticated user.

## Learning Outcomes
Practised full-stack integration, REST APIs, MongoDB, password hashing, JWT authentication, protected routes, and user-specific data access.