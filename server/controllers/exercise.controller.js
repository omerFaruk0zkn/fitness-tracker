import Exercise from "../models/exercise.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFile, uploadFile } from "../utils/manageFile.js";

export const createExercise = asyncHandler(async (req, res) => {
  const { name, description, muscleGroup } = req.body;

  if (!req.file) throw new AppError(400, "Video dosyası gerekli");

  const uploadResult = await uploadFile(req.file.path, "video", "exercises");

  const newExercise = await Exercise.create({
    name,
    description,
    muscleGroup,
    video: {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    },
  });

  res
    .status(201)
    .json({ message: "Egzersiz oluşturuldu", exercise: newExercise });
});

export const getAllExercises = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find().sort({ createdAt: -1 });
  res.json(exercises);
});

export const deleteExercise = asyncHandler(async (req, res) => {
  const { exerciseId } = req.params;

  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) throw new AppError(404, "Egzersiz bulunamadı");

  await deleteFile(exercise.video.publicId, "video");

  await Exercise.findByIdAndDelete(exerciseId);

  res.status(200).json({ message: "Egzersiz silindi" });
});
