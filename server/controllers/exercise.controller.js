import Exercise from "../models/exercise.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFile, uploadFile } from "../utils/manageFile.js";

export const createExercise = asyncHandler(async (req, res) => {
  const { name, description, muscleGroup } = req.body;

  const videoFile = req.files?.video?.[0];
  if (!videoFile) throw new AppError(400, "Video dosyası gerekli");

  const videoUpload = await uploadFile(videoFile.path, "video", "exercises");

  const imageFile = req.files?.image?.[0];
  if (!imageFile) throw new AppError(400, "Resim dosyası gerekli");

  const imageUpload = await uploadFile(imageFile.path, "image", "images");

  const newExercise = await Exercise.create({
    name,
    description,
    muscleGroup,
    video: {
      url: videoUpload.secure_url,
      publicId: videoUpload.public_id,
    },
    image: {
      url: imageUpload.secure_url,
      publicId: imageUpload.public_id,
    },
  });

  res
    .status(201)
    .json({ message: "Egzersiz oluşturuldu", exercise: newExercise });
});

export const getAllExercises = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const muscleGroup = req.query.muscleGroup;

  const query = muscleGroup && muscleGroup !== "Tümü" ? { muscleGroup } : {};

  const skip = (page - 1) * limit;

  const [exercises, total] = await Promise.all([
    Exercise.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Exercise.find(query).countDocuments(),
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

  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) throw new AppError(404, "Egzersiz bulunamadı");

  if (req.files?.video?.[0]) {
    if (exercise.video?.publicId) {
      await deleteFile(exercise.video.publicId, "video");
    }

    const videoUpload = await uploadFile(
      req.files.video[0].path,
      "video",
      "exercises"
    );
    updateData.video = {
      url: videoUpload.secure_url,
      publicId: videoUpload.public_id,
    };
  }

  if (req.files?.image?.[0]) {
    if (exercise.image?.publicId) {
      await deleteFile(exercise.image.publicId, "image");
    }

    const imageUpload = await uploadFile(
      req.files.image[0].path,
      "image",
      "images"
    );
    updateData.image = {
      url: imageUpload.secure_url,
      publicId: imageUpload.public_id,
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

  if (exercise.video?.publicId) {
    await deleteFile(exercise.video.publicId, "video");
  }

  if (exercise.image?.publicId) {
    await deleteFile(exercise.image.publicId, "image");
  }

  await Exercise.findByIdAndDelete(exerciseId);

  res.status(200).json({ message: "Egzersiz silindi" });
});
