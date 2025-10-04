# Task Management App – Mock Fullstack Project

## Overview
This project is a **fullstack technical assessment** built with **Vue.js (frontend)** and **Express.js (backend)**.  
It demonstrates a login flow, a task CRUD module (Create, Read, Update, Delete), and API design with filtering, sorting, and pagination.  

The backend uses a **mock API (in-memory storage, no real database)**, but we also provide **MongoDB index recommendations** to show how this project would scale in a real database scenario.

---

## Features

### Backend (Express.js Mock API)
- **Authentication**
  - `POST /login` returns a mock token for authentication.
  - Example credentials:  
    - **Email:** `test@mile.app`  
    - **Password:** `password`  
- **Task Endpoints**
  - `GET /tasks` – supports **filter, search, sort, pagination** and returns metadata.
  - `POST /tasks` – create new task.
  - `PUT /tasks/:id` – update existing task.
  - `DELETE /tasks/:id` – delete a task.
- **Error handling & status codes** mimic real-world API responses.

### Frontend (Vue.js)
- **Login Page** – simple mock auth flow using token-based authentication.
- **Task Module** – fully functional:
  - Create, update, delete, and list tasks.
  - Filter by **status**.
  - Search by **title/description**.
  - Sort by **title, status, or created_at**.
  - Pagination with **page info and navigation buttons**.
- **Responsive UI** with clean and simple design.

---

## MongoDB Index Recommendations
Even though this app uses mock storage, here are suggested indexes if connected to MongoDB:

```js
// db/indexes.js
db.tasks.createIndex({ status: 1 })
/**
 * Improves query performance for filtering tasks by status
 * Example: { status: "pending" } or { status: "done" }
 */

db.tasks.createIndex({ created_at: -1 })
/**
 * Optimizes queries for sorting tasks by creation date (newest/oldest first).
 */

db.tasks.createIndex({ title: "text", description: "text" })
/**
 * Enables efficient text search across title and description fields.
 * Example: { $text: { $search: "documentation" } }
 */
```

**Reasoning:**
- `status` index → speeds up filtering by task status.  
- `created_at` index → ensures fast sorting by date.  
- `text` index on `title` + `description` → enables search functionality.  

---

## Deployment
- Backend deployed (Express mock API) → Vercel → https://mileapp-backend.vercel.app
- Frontend deployed (Vue.js) → Vercel → https://mileapp.vercel.app

---

## How to Run Locally

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Credentials for Testing
Use the following credentials to log in:

- **Email:** `test@mile.app`  
- **Password:** `password`  

---

## Design Decisions & Strengths
- **Mock API design** mimics real-world structure with auth, meta, and error handling.
- **Clean separation** between frontend (Vue) and backend (Express).
- **Responsive & simple UI** optimized for usability.
- **Indexes chosen** with scalability in mind, ensuring efficient queries as data grows.
