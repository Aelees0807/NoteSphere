# 📓 Notesphere – Secure Notes App with JWT Authentication

Notesphere is a secure Notes Management application that allows users to create, read, update, and delete their personal notes.  
The project is powered by **Node.js**, **Firebase Firestore**, **JWT Authentication**, and a **Tailwind CSS** frontend.

---

## 🚀 Features

- 🔐 **JWT Authentication** – Secure login and route protection.
- 📝 **CRUD Notes API** – Create, Read, Update, and Delete notes.
- 👤 **Multi-User Support** – Each user can only access their own notes.
- 🔍 **Search & Filter** – Find notes easily by title or content.
- 🗑️ **Recycle Bin** – Move notes to trash and restore later.
- 🎨 **Modern UI** – Built with React + Tailwind CSS.
- ☁️ **Cloud Firestore** – Scalable NoSQL database.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Authentication:** JSON Web Tokens (JWT)  
- **Database:** Firebase Firestore  
- **Deployment:** (Heroku / Vercel / Firebase Hosting – choose as per team setup)  

---

## 📂 Project Structure

notes-app/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── notesController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── notesRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── firebase-service-account.json  <-- IMPORTANT: Keep this secure
│   ├── index.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── NoteCard.jsx
    │   │   └── NoteModal.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    └── tailwind.config.js
