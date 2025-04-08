// backend/routes/user.routes.js
import express from "express";
import { getAllUsers, getUserById, deleteUser } from "../controllers/user.controller.js";
import { authenticateJWT, authorizeRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.get("/", authenticateJWT, authorizeRole(["superuser", "admin"]), getAllUsers);
router.get("/:id", authenticateJWT, getUserById);
router.delete("/:id", authenticateJWT, authorizeRole(["superuser"]), deleteUser);

export default router;