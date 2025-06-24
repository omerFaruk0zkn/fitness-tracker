import express from "express";
import {
  createWorkout,
  deleteWorkoutItem,
  getWorkoutByDate,
  updateWorkout,
  updateWorkoutProgress,
} from "../controllers/workout.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createWorkout);
router.put("/", updateWorkout);
router.put("/:date/:exerciseId", deleteWorkoutItem);
router.get("/:date", getWorkoutByDate);
router.patch("/progress/:workoutId", updateWorkoutProgress);

export default router;
