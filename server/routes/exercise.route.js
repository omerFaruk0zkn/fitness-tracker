import express from "express";
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  updateExercise,
} from "../controllers/exercise.controller.js";
import { uploadBoth } from "../middlewares/uploadMixed.middleware.js";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", isAdmin, uploadBoth, createExercise);
router.get("/", getAllExercises);
router.put("/:exerciseId", isAdmin, uploadBoth, updateExercise);
router.delete("/:exerciseId", isAdmin, deleteExercise);

export default router;
