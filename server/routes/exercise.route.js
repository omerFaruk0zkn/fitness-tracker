import express from "express";
import {
  createExercise,
  deleteExercise,
  getAllExercises,
} from "../controllers/exercise.controller.js";
import { uploadVideo } from "../middlewares/upload.middleware.js";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, uploadVideo.single("video"), createExercise);
router.get("/", getAllExercises);
router.delete("/:exerciseId", protect, isAdmin, deleteExercise);

export default router;
