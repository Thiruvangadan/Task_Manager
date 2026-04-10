# 📝 MindNote – Smart Notes App

A clean and minimal full-stack notes application designed to help users organize thoughts by date, with fast search and reliable performance.

---

## 🌐 Live Demo

👉 **Try the app here:** https://task-manager-vji8.onrender.com/

---

## 🌟 Features

* 🗒️ Create, update, and delete notes
* 📅 Organize notes by date (Yesterday, Today, Tomorrow, All)
* 🔍 Search notes with optimized debouncing
* ⏱️ View note creation and last updated timestamps
* ⚡ Rate limiting for improved backend stability
* 🎯 Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* JavaScript
* Tailwind css

### Backend

* Node.js
* Express.js

### Database

* MongoDB

---

## ⚙️ How It Works

1. User accesses the app

2. Creates notes with:

   * Title
   * Content
   * Date

3. Notes are stored and can be:

   * Edited
   * Deleted
   * Filtered by date

4. Search functionality:

   * Uses **debouncing** to reduce API calls
   * Improves performance and responsiveness

5. Backend includes:

   * Rate limiting to prevent excessive requests
   * Timestamp tracking for each note

---

## 📦 Setup Instructions

```bash id="7j1s9f"
# Clone the repo
git clone <your-repo-link>

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### 🔧 Environment Variables

Create a `.env` file in the backend:

```env id="y2k8op"
MONGO_URI=your_database_url
PORT=5000

```

---

## ▶️ Run the Project

```bash id="3pl8dz"
# backend
npm run dev

# frontend
npm run dev
```

---

## 💡 Key Learnings

* Implemented **debouncing** to optimize search performance
* Understood importance of **rate limiting** in backend systems
* Built a complete CRUD workflow with real-world usability
* Managed date-based filtering and UI state efficiently

---

## 🚧 Future Improvements

* Add authentication system
* Rich text editor for notes
* Tagging and categorization
* Dark/light theme toggle

---

