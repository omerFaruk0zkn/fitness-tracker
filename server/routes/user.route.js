import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { uploadImage } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.use(protect);

router.put("/update", uploadImage.single("profileImg"), updateUser);

export default router;
