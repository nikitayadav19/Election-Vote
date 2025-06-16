# 🗳️ Election Voting System – MERN Stack Project

An end-to-end online election voting application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This system includes voter authentication, real-time vote casting, admin management, live voting updates, and protected route handling for both admins and users.

---

## 🚀 Features

### 👤 Voter Side
- ✅ **Signup/Login** with secure password hashing (bcrypt)
- 🔐 **JWT authentication**
- 📥 **Vote** for candidates (only once)
- 📊 View **live voting** results
- 🧑‍💼 Access **Dashboard** and **Profile**

### 🛠️ Admin Side
- 🔒 Admin-protected routes
- 📋 **Add/Update/Delete Candidates**
- 📊 View all candidates and results
- 🔐 Authentication protected by role

### 🌐 Public Pages
- 🏠 Home
- 👥 Candidates list
- 📊 Live Voting
- ❌ Unauthorized access page

---

## 🧠 Tech Stack

| Frontend     | Backend        | Auth/Security      | UI & Charts |
|--------------|----------------|--------------------|-------------|
| React.js     | Node.js + Express | JWT, bcrypt        | Tailwind CSS, React Icons, Recharts |
| React Router | MongoDB        | Passport (local)   |             |

---

## 🗂️ Folder Structure


├── client/ # React frontend
│ ├── pages/ # Login, Signup, Home, etc.
│ ├── user/ # Voter dashboard, vote, profile
│ ├── admin/ # Admin dashboard, candidate mgmt
│ └── ProtectedRoute.jsx # Role-based route protection
├── server/ # Express backend
│ ├── models/ # User, Candidate schemas
│ ├── routes/ # API routes (auth, vote, admin)
│ ├── middleware/ # JWT verification, roles
│ └── server.js # Entry point
├── .env.example # Environment variable template
├── README.md # You're here!


##  🔐 Auth & Security
Passwords are hashed using bcrypt
Sessions handled with jsonwebtoken
Role-based route protection using ProtectedRoute wrapper and middleware

## 📈 Charts
Voting results visualized with Recharts
Clean UI with Tailwind CSS

## 👩‍💻 Author
Nikita Yadav

## 📬 Contributing
Pull requests and suggestions are welcome! Feel free to fork the repo and contribute to make it better.


