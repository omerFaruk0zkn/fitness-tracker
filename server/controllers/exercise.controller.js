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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  const [exercises, total] = await Promise.all([
    Exercise.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Exercise.countDocuments(),
  ]);

  res.json({
    exercises,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
});

export const updateExercise = asyncHandler(async (req, res) => {
  const { exerciseId } = req.params;

  const updateData = {};
  const { name, description, muscleGroup } = req.body;

  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (muscleGroup !== undefined) updateData.muscleGroup = muscleGroup;

  if (req.file) {
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) throw new AppError(404, "Egzersiz bulunamadı");

    if (exercise.video?.publicId) {
      await deleteFile(exercise.video.publicId, "video");
    }

    const uploadResult = await uploadFile(req.file.path, "video", "exercises");
    updateData.video = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  }

  const updatedExercise = await Exercise.findByIdAndUpdate(
    exerciseId,
    updateData,
    {
      new: true,
    }
  );

  if (!updatedExercise) {
    throw new AppError(404, "Egzersiz bulunamadı");
  }

  res.status(200).json({
    message: "Egzersiz güncellendi",
    exercise: updatedExercise,
  });
});

export const deleteExercise = asyncHandler(async (req, res) => {
  const { exerciseId } = req.params;

  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) throw new AppError(404, "Egzersiz bulunamadı");

  await deleteFile(exercise.video.publicId, "video");

  await Exercise.findByIdAndDelete(exerciseId);

  res.status(200).json({ message: "Egzersiz silindi" });
});
