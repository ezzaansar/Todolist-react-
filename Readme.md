TodoList App

A simple Todo List application with a React.js frontend and an Express.js backend.
Users can add, view, edit, and delete todos. The backend manages the data, while the frontend provides a clean and responsive UI with Tailwind CSS.

Features
✅ Add new todos
✏️ Edit existing todos
🗑 Delete todos
📦 REST API with Express.js
🎨 Responsive UI using React + Tailwind CSS
Tech Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database (optional): MongoDB / In-memory storage (depending on setup)

Installation
1. Clone the repository
git clone https://github.com/yourusername/todolist-app.git
cd todolist-app

2. Install dependencies
Install frontend dependencies:
cd client
npm install

Install backend dependencies:
cd ../server
npm install

Running the App
1. Start the backend
cd server
npm run dev


This will start the Express server (default: http://localhost:5000).

2. Start the frontend
cd client
npm run dev


The React app will run (default: http://localhost:5173 for Vite or http://localhost:3000 for CRA).

Project Structure 
Task-Tracker
│── backend/        # Express.js backend
│   ├── src/
│   ├── package.json
│   └── ...
│
│── frontend/       # React + Tailwind frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   └── ...
│
└── Readme.md


API Endpoints
GET /api/todos

Fetch all todos.

POST /api/todos

Add a new todo.
Body: { "text": "Buy groceries" }

PUT /api/todos/:id

Update a todo.
Body: { "text": "Finish homework", "done": true }

DELETE /api/todos/:id

Delete a todo.

Scripts
Client
npm run dev       # start frontend dev server
npm run build     # build for production

Server
npm run dev       # start backend with nodemon
npm start         # start backend (production)

Future Enhancements
🔐 Add user authentication
🗂 Connect to MongoDB for persistent storage
📱 Add mobile-friendly PWA support

📜 License

MIT License