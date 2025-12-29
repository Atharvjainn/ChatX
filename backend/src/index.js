import express from "express";
import { CLIENT_URL } from "./config/serverConfig.js";
import authRoutes from "./routes/auth-routes.js"
import messageRoutes from './routes/message-routes.js'
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { app, server } from "./config/socket.js";

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
}))
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3001


const startServer = async () => {
    server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
    await connectDB();
}

startServer()

