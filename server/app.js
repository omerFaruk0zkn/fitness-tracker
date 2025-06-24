import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.route.js";
import exerciseRoutes from "./routes/exercise.route.js";
import workoutRoutes from "./routes/workout.route.js";
import progressRoutes from "./routes/progress.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

export default app;
