// backend/routes/auth.routes.js
import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser); // Optional for dev only

export default router;