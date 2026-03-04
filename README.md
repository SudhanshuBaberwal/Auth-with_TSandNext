# 🔐 Advanced Authentication System

A full-stack authentication system built with **Next.js, TypeScript, Express, and MongoDB**.
This project demonstrates a **complete secure authentication flow** including email verification, password reset, protected routes, and JWT-based authentication.

---

## 🚀 Features

* User Signup
* Email Verification (OTP / Token)
* Secure Login System
* JWT Authentication
* Protected Routes
* Forgot Password
* Reset Password with Token
* Logout Functionality
* Form Validation using React Hook Form
* Smooth UI animations with GSAP
* Secure password hashing
* Environment variable configuration

---

## 🧰 Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* React Hook Form
* GSAP Animations
* Axios
* Tailwind CSS
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Nodemailer (Email Verification)
* Bcrypt (Password Hashing)

---

## 📁 Project Structure

```
Advance-Auth
│
├── client
│   ├── app
│   │   ├── login
│   │   ├── signup
│   │   ├── verify-email
│   │   ├── forgot-password
│   │   └── reset-password/[token]
│   │
│   ├── components
│   ├── lib
│   │   └── axios.ts
│   └── styles
│
├── server
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── utils
│   └── server.ts
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/SudhanshuBaberwal/Auth-with_TSandNext.git
```

```
cd Auth-with_TSandNext
```

---

### 2️⃣ Install dependencies

#### Client

```
cd client
npm install
```

#### Server

```
cd server
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` file in **server**

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

CLIENT_URL=http://localhost:3001
```

Create `.env.local` in **client**

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

---

### 4️⃣ Run the Project

Start backend

```
cd server
npm run dev
```

Start frontend

```
cd client
npm run dev
```

Frontend runs on:

```
http://localhost:3001
```

Backend runs on:

```
http://localhost:3000
```

---

## 🔑 Authentication Flow

```
User Signup
     ↓
Verification Email Sent
     ↓
User Verifies Email
     ↓
User Login
     ↓
JWT Token Stored in Cookie
     ↓
Protected Routes Accessible
     ↓
Forgot Password
     ↓
Reset Password via Token
```

---
---

## 📌 Future Improvements

* Google OAuth Login
* Refresh Tokens
* Role Based Authorization
* Rate Limiting
* Email Templates
* Account Lock after Failed Attempts

---

## 👨‍💻 Author

**Sudhanshu Baberwal**

GitHub:
https://github.com/SudhanshuBaberwal

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!

---
