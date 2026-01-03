# 💬 ChatX — Real-Time Chat Application

ChatX is a **secure, real-time chat application** that allows users to communicate instantly with support for authentication, image sharing, and protection against abuse.

It is built using a **modern TypeScript-first full-stack web stack**, focusing on scalability, security, and real-time performance.

---

## 🚀 Live Demo
🔗 https://chatx-frontend-dxup.onrender.com/

---

## ✨ Features

- 🔐 JWT-based authentication  
- 💬 Real-time messaging using WebSockets
- 🟢 Real-time online user monitoring
- 🖼️ Image uploads via Cloudinary  
- ⚡ Global state management with Zustand  
- 🛡️ Security with Arcjet (rate limiting & bot detection)  
- 📱 Responsive UI built with Tailwind CSS  

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- Next.js (**TypeScript**)
- React
- Zustand
- Axios
- Socket.IO Client
- WebSockets
- Tailwind CSS

### ⚙️ Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Arcjet
- REST APIs

---

## 🧑‍💻 Getting Started (Local Setup)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Atharvjainn/ChatX.git
cd ChatX 
```
### 2️⃣ Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```
### 3️⃣ Set Environment Variables
#### Frontend
```bash
NODE_ENV=development
MONGO_URL=<YOUR_MONGODB_CONNECTION_STRING>
JWT_SECRET=<YOUR_JWT_SECRET>
CLIENT_URL=http://localhost:3000  #Frontend URL

CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_NAME>
CLOUDINARY_CLOUD_API=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_CLOUD_SECRET=<YOUR_CLOUDINARY_API_SECRET>

ARCJET_KEY=<YOUR_ARCJET_API_KEY>
ARCJET_ENV=development
```

#### Frontend
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api   
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
#Backend is running on PORT 3001
```
### 4️⃣ Run the Project
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev
```
### 👨‍💻 Author
#### Atharv Jain

### 📄 License
#### Distributed under the MIT License.


