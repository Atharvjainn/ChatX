import express from "express";
import { signup,login } from "../controllers/auth-controller.js";
import { login_middlewares, signup_middlewares } from "../middlewares/auth-middlewares.js";
const router = express.Router();

router.post("/login",login_middlewares,login);
router.post("/signup",signup_middlewares,signup);
// router.post("/logout",logout);

export default router;