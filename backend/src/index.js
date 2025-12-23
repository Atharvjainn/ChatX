import express from "express";
import { PORT } from "./config/serverConfig.js";
import authRoutes from "./routes/auth-routes.js"
const app = express();

app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})