import Workout from "../models/workout.model.js";
import Exercise from "../models/exercise.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createWorkout = asyncHandler(async (req, res) => {
  const { date, exercises } = req.body;

  const exists = await Workout.findOne({ userId: req.user._id, date });
  if (exists) throw new AppError(400, "Bu tarihte zaten bir antrenman var");

  await Workout.create({
    userId: req.user._id,
    date,
    exercises,
  });

  const workout = await Workout.findOne({
    userId: req.user._id,
    date,
  })
    .populate("exercises.exerciseId")
    .lean();

  res.status(201).json({ message: "Antrenman oluşturuldu", workout });
});

export const updateWorkout = asyncHandler(async (req, res) => {
  const { date, exercises } = req.body;

  const workout = await Workout.findOne({ userId: req.user._id, date });

  if (!workout) throw new AppError(404, "Antrenman bulunamadı");

  const seenIds = new Set();
  for (const exercise of exercises) {
    if (seenIds.has(exercise.exerciseId)) {
      const ex = await Exercise.findById(exercise.exerciseId);
      const name = ex?.name || "Egzersiz";
      throw new AppError(
        400,
        `${name} adlı egzersizi birden fazla ekleyemezsiniz`
      );
    }
    seenIds.add(exercise.exerciseId);
  }

  const updatedExercises = exercises.map((exercise) => {
    const existing = workout.exercises.find(
      (e) => e.exerciseId.toString() === exercise.exerciseId
    );

    const completedSets = existing?.completedSets || 0;

    if (exercise.sets < completedSets) {
      throw new AppError(
        400,
        `Geçersiz işlem: ${exercise.sets} set, ${completedSets} tamamlanan setten az olamaz`
      );
    }

    return {
      ...exercise,
      completedSets,
    };
  });

  workout.date = date;
  workout.exercises = updatedExercises;
  await workout.save();

  const updatedWorkout = await Workout.findOne({
    userId: req.user._id,
    date,
  })
    .populate("exercises.exerciseId")
    .lean();

  res
    .status(201)
    .json({ message: "Antrenman güncellendi", workout: updatedWorkout });
});

export const deleteWorkoutItem = asyncHandler(async (req, res) => {
  const { date, exerciseId } = req.params;

  const workout = await Workout.findOne({ userId: req.user._id, date });
  if (!workout) throw new AppError(404, "Antrenman bulunamadı");

  workout.exercises = workout.exercises.filter(
    (ex) => ex.exerciseId.toString() !== exerciseId
  );

  await workout.save();

  if (workout.exercises.length === 0) {
    await Workout.findOneAndDelete({ userId: req.user._id, date });
  }

  res.status(201).json({ message: "Antrenman güncellendi", workout });
});

export const getWorkoutByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;

  const workout = await Workout.findOne({
    userId: req.user._id,
    date,
  })
    .populate("exercises.exerciseId")
    .lean();
  if (!workout) throw new AppError(404, "Antrenman bulunamadı");

  res.status(200).json(workout);
});

export const updateWorkoutProgress = asyncHandler(async (req, res) => {
  const { workoutId } = req.params;
  const { exerciseId } = req.body;

  const workout = await Workout.findById(workoutId);
  if (!workout || String(workout.userId) !== String(req.user._id))
    throw new AppError(404, "Antrenman bulunamadı");

  const targetExercise = workout.exercises.find(
    (ex) => String(ex.exerciseId) === exerciseId
  );
  if (!targetExercise) throw new AppError(404, "Egzersiz bulunamadı");

  if (targetExercise.completedSets < targetExercise.sets) {
    targetExercise.completedSets += 1;
    await workout.save();
    return res.status(200).json({ message: "Set ilerletildi", workout });
  }

  throw new AppError(400, "Tüm setler zaten tamamlandı");
});
