import express from "express";
import {
  registerUser,
  changePassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

// PRIVATE ROUTES
router.get("/current", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware, logoutUser);
router.put("/update", authMiddleware, updateUser);
router.put("/change-password", authMiddleware, changePassword);

export default router;
