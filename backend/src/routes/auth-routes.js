import express from "express";
import { signup,login,logout, Updateprofile } from "../controllers/auth-controller.js";
import { login_middlewares, signup_middlewares, verifyToken } from "../middlewares/auth-middlewares.js";
import { arcjet_protection } from "../middlewares/arcjet-middleware.js";
const router = express.Router();

router.use(arcjet_protection);

router.post("/login",login_middlewares,login);
router.post("/signup",signup_middlewares,signup);
router.post("/logout",logout);
router.put("/updateProfile",verifyToken,Updateprofile)
router.get('/check',verifyToken,(req,res) => {
    return res.status(200).json(req.user)
});

export default router;