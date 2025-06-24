import cloudinary from "../config/cloudinary.js";

export const uploadFile = async (file, type, folderName) => {
  const uploadFolderResult = await cloudinary.uploader.upload(file, {
    resource_type: type,
    folder: `fittness-tracker/${folderName}`,
  });

  return uploadFolderResult;
};

export const deleteFile = async (publicId, type) => {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: type,
  });
};
