import express from "express";
import { checkAuth, login, signup, updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.put("/update", authMiddleware, updateProfile)
userRouter.get("/check", authMiddleware, checkAuth)

export default userRouter