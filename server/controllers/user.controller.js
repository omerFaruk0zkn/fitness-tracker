import User from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFile, uploadFile } from "../utils/manageFile.js";

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, target_weight, weight } = req.body;

  if (typeof target_weight === "string" && target_weight.includes(",")) {
    throw new AppError(400, "Virgül yerine nokta kullanınız");
  }

  let uploadResult;

  if (req.file) {
    uploadResult = await uploadFile(req.file.path, "image", "profile");
  }

  const user = await User.findById(req.user._id);
  if (!user) throw new AppError(404, "Kullanıcı bulunamadı");

  const updateFiles = {
    name: name || user.name,
    email: email || user.email,
    target_weight: target_weight
      ? target_weight.replace(",", ".")
      : user.target_weight,
    weight: weight ? weight.replace(",", ".") : user.weight,
  };

  if (uploadResult) {
    updateFiles["profileImg.url"] = uploadResult.secure_url;
    updateFiles["profileImg.publicId"] = uploadResult.public_id;
  }

  const updated = await User.findByIdAndUpdate(req.user._id, updateFiles, {
    new: true,
  });

  if (req.file && user.profileImg.url) {
    await deleteFile(user.profileImg.publicId, "image");
  }

  res.status(200).json({
    message: "Profil güncellendi!",
    user: updated,
  });
});
