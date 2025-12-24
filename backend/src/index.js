import express from "express";
import { PORT } from "./config/serverConfig.js";
import authRoutes from "./routes/auth-routes.js"
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use("/api/auth", authRoutes);


const startServer = async () => {
    app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
    await connectDB();
}

startServer()

