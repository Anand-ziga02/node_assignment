# 🚀 Task Management API

A **Task Management System** built with **Node.js (Express.js)**, providing full **user authentication**, **task**, **project**, and **category management**, using **JWT** for secure auth and **bcrypt** for password encryption.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Encryption**: bcrypt
- **Testing & API Client**: Postman

---

## 🔐 Authentication Features

- ✅ User Signup
- ✅ User Login
- ✅ Forgot Password
- ✅ Password Reset
- ✅ JWT-based session management
- ✅ Password hashing using bcrypt

---

## 📁 API Endpoints Overview

### 👤 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user and get JWT token |
| POST | `/api/auth/profile/avatar` | Upload Profile Avatar Pic |
| POST | `/api/auth/forgot-password` | Send reset link/token (if implemented) |
| POST | `/api/auth/reset-password/:token` | Reset user password |

---

### 📌 Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create a new project |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get a specific project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

---

### 🗂️ Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/categories` | Create a new category |
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get a specific category |
| PUT | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

---

### ✅ Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a specific task |
| PUT | `/api/tasks/:id` | Update task (title, description, status, etc.) |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/tasks/:id/dependencies` | Get task dependencies |
| POST | `/api/tasks/:task_id/assign` | Assign a task to a user |
| PUT | `/api/tasks/:id/status` | Update task status (e.g. completed) |
| GET | `/api/tasks/status-summary` | Get a summary of task statuses |

---

## 🗃️ Database Setup (PostgreSQL + Prisma)

This project uses **PostgreSQL** and **Prisma ORM**. You can easily connect and migrate your local database.

### 🔧 Setup Instructions

1. **Create `.env` file** in the root:
   ```env
   DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<your_database>"
2. **Install dependencies** : npm install
3. **Run database migration** : npx prisma migrate dev --name init
4. **Generate Prisma client** : npx prisma generate

# 🚀 Run The Application
npm run start

📩 Postman Collection
"https://elements.getpostman.com/redirect?entityId=21057670-eee1f121-5927-4701-9b84-fd09b497c507&entityType=collection"
