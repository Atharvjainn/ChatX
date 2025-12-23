import express from "express";
import { signup } from "../controllers/auth-controller.js";
import { signup_middlewares } from "../middlewares/auth-middlewares.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Login Page");
});

router.post("/signup",signup_middlewares,signup);

router.get("/logout", (req, res) => {
  res.send("Logout Page");
});

export default router;