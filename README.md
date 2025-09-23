# blog-project

## Project Overview

This is a simple full-stack blog application which includes:

- A Node.js + Express backend that exposes a JSON REST API for posts and comments, persisting data in MongoDB
- A React + TypeScript frontend (created with create-react-app) that consumes the backend API and provides a responsive UI
- Bootstrap 5 for styling and responsive layout

Features:

- Create, list, and view blog posts
- Add and delete comments for posts
- Simple server-side validation and error handling

This repository contains both the backend and the frontend under the `backend/` and `frontend/` folders respectively.

## Tech Stack

- Backend: Node.js, Express, TypeScript, Mongoose (MongoDB)
- Frontend: React, TypeScript, Bootstrap 5
- Packaging: npm

## Design Decisions

- Separation of concerns: Backend handles data and business logic; frontend handles presentation and user interaction. All files are contained in a single repository in order to pass all files at once.
- Type safety: TypeScript is used in backend and frontend to minimize runtime type errors and help readability.

## Setup & Run (local development)

This section assumes you are running on Windows (PowerShell) and prioritizes the included helper scripts which minimize manual setup.

Prerequisites:

- Node.js (v14+ recommended)
- npm (v6+)
- MongoDB instance (local or hosted)

Environment variables

This project uses simple `.env` files for local development. Create one `.env` in the `backend/` folder and another `.env` in the `frontend/` folder by copying the provided example files and editing them as needed:

```powershell
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

The `.env.example` files in the repository show recommended variables and values (they are the canonical source of example values). After creating or updating `.env` files, restart the relevant dev server so the environment variables are picked up.

The repository includes helper scripts that automate install/build/start steps and are advisable to use for testing:

- `start-all.ps1` (project root): Attempts to use Docker if available; otherwise it launches the local helper scripts below in separate PowerShell windows and opens the browser when the frontend is ready.
- `backend/start-backend.ps1`: Installs dependencies (if needed), builds the backend, and runs the compiled server (`node dist/app.js`).
- `frontend/start-frontend.ps1`: Installs dependencies (if needed) and starts the frontend dev server (`npm start`).

Recommended Usage:

1.a From the project root (PowerShell) (Note: if this does not work, just skip to the next step.):

```powershell
.\start-all.ps1
```

1.b If the first step does not work or you prefer to start services manually in separate windows:

Backend window:

```powershell
cd backend
.\start-backend.ps1
```

Frontend window:

```powershell
cd frontend
.\start-frontend.ps1
```

Alternatively, manual commands (if you want to run sequentially in a single terminal)

Backend (run in `backend/`):

```powershell
npm install
npm run build
node dist/app.js
```

Frontend (run in `frontend/`):

```powershell
npm install
npm start
```

2. Seeding the database (add sample data)

To populate the database with an example post and two comments (helpful for demo/inspection), run the backend seed script.

2.1 Ensure the backend `.env` is set to point at your MongoDB instance (default: `mongodb://localhost:27017/blogapp`).

2.2 From the `backend/` folder run:

```powershell
npm run seed
```

This will connect to the configured MongoDB, clear `posts` and `comments` collections, and insert a sample post and two comments.

Notes:
- Seeding is destructive for those collections — only run against a development database.
- If you use Docker, ensure the MongoDB container is running before seeding (or run the seed inside a container or after starting Docker services).

## API Reference

Endpoints:

- GET `/posts` — Returns all posts (sorted newest first). Response: `Post[]`.
- GET `/posts/:id` — Returns a single post by ID (populated with comments). Response: `Post`.
- POST `/posts` — Create a new post. Body: `{ title, content, author }`. Returns created `Post`.

- GET `/comments/post/:postId` — Returns comments for a post. Response: `Comment[]`.
- POST `/comments` — Create a new comment. Body: `{ postId, content, author }`. Returns created `Comment`.
- DELETE `/comments/:id` — Delete a comment by ID. Returns success message.
