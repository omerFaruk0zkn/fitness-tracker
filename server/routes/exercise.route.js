import express from "express";
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  updateExercise,
} from "../controllers/exercise.controller.js";
import { uploadVideo } from "../middlewares/upload.middleware.js";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", isAdmin, uploadVideo.single("video"), createExercise);
router.get("/", getAllExercises);
router.put(
  "/:exerciseId",
  isAdmin,
  uploadVideo.single("video"),
  updateExercise
);
router.delete("/:exerciseId", isAdmin, deleteExercise);

export default router;
