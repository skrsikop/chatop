# 💬 ChatOp - Real-Time Chat Web App

[![Gemini-Generated-Image-sbfqnesbfqnesbfq.png](https://i.postimg.cc/8C0QfmhZ/Gemini-Generated-Image-sbfqnesbfqnesbfq.png)](https://postimg.cc/KKBsdLpT)

ChatOp is a **real-time chat web application** built with the **MERN Stack** and **Socket.IO**, enabling instant messaging with authentication, media uploads, and cloud storage.

---

## 🚀 Features

* 🔐 **User Authentication** with JWT (Login/Signup)
* 💬 **Real-time Messaging** with Socket.IO
* 🖼️ **Media Uploads** powered by Cloudinary
* 🗄️ **Cloud Database** using MongoDB Atlas
* ⚡ **Scalable Backend** with Express + Node.js
* 🌐 **Deployment Ready** (Vercel, Render, or Railway)
* 🎨 **Modern UI/UX** with dark theme support

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js + Express
* **Database:** MongoDB Atlas
* **Authentication:** JWT (JSON Web Tokens)
* **Real-time:** Socket.IO
* **File Storage:** Cloudinary
* **Deployment:** Vercel (Frontend), Render/Railway (Backend)

---

## 📂 Project Structure

```
chatop/
├── client/       # React frontend
├── server/       # Node.js + Express backend
│   ├── models/   # MongoDB models
│   ├── routes/   # Express routes
│   ├── controllers/ # Business logic
│   └── utils/    # Helper functions
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/skrsikop/chatop.git
cd chatop
```

### 2️⃣ Install Dependencies

Frontend (React):

```bash
cd client
npm install
```

Backend (Node.js + Express):

```bash
cd ../server
npm install
```

### 3️⃣ Setup Environment Variables

Inside `server/` create a file named `.env` and add:

```env
PORT=5000
MONGODB=mongodb url
JWT_SECRET=jwtsecret

CLOUDINARY_NAME=cloudinary name
CLOUDINARY_API_KEY=cloudinary api key
CLOUDINARY_API_SECRET=cloudinary api secret
```

> ⚠️ Ensure the variable names match your Cloudinary config file.

---

## ☁️ Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com) and create an account.
2. From the dashboard, copy your **Cloud Name**, **API Key**, and **API Secret**.
3. Paste them into your `.env` file as shown above.

---

## ▶️ Run Locally

Backend (Node.js + Express + Socket.IO):

```bash
cd server
npm run dev
```

Frontend (React):

```bash
cd client
npm start
```

---

## 🌍 Deployment

* **Frontend:** Deploy `client/` on [Vercel](https://vercel.com)
* **Backend:** Deploy `server/` on [Render](https://render.com) or [Railway](https://railway.app)
* **Database:** MongoDB Atlas (already configured)
* **File Storage:** Cloudinary

---

## 📸 Demo

🔗 [Live Demo](https://chatop-flame.vercel.app/)

![ChatOp Demo](https://lh3.googleusercontent.com/gg-dl/AJfQ9KQcps-zh_OfiLUBwRe6xeXfO3wG8w2IW2ObO1ACFEH83M59wdJB79H0TplUdMbYPJMDafl-ThDuBZfrvvQPS3ej3GJTiDffzmdcGeywmolKdpwX5sPEmLyXWTPvhAX-3wxZFkVZNsnwZKu3UYZWsemA1s7aQshP8rFQwnIqLKxBgaOL0A=s1024)

---

## 👨‍💻 Author

* **Name:** skrsikop
* **Email:** [skrsikop@gmail.com](mailto:skrsikop@gmail.com)
* **Portfolio:** [skrsikoop.vercel.app](https://skrsikoop.vercel.app)
* **GitHub:** [github.com/skrsikop](https://github.com/skrsikop)

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License © 2025 skrsikop
```
