import { Router } from "express";

const router = Router();
import {
  createTask,
  deleteTask,
  getTaskList,
  updateTask,
} from "../controllers";

router.post("/tasks", createTask);
router.get("/tasks", getTaskList);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
