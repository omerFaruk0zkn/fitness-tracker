import express from "express";
import {
  createProgress,
  deleteProgress,
  exportProgressToPDF,
  getProgressData,
  updateProgress,
} from "../controllers/progress.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createProgress);
router.get("/", getProgressData);
router.put("/:progressId", updateProgress);
router.delete("/:progressId", deleteProgress);
router.post("/export", exportProgressToPDF);

export default router;
