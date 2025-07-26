import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// PRIVATE ROUTES
router
  .route("/gp")
  .get(authMiddleware, getTasks)
  .post(authMiddleware, createTask);

router
  .route("/:id")
  .get(authMiddleware, getTaskById)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

export default router;
