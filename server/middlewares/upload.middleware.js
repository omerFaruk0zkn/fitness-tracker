import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (allowedExtensions) => {
  return (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return cb(
        new Error(
          `Sadece şu dosya türlerine izin verilir: ${allowedExtensions.join(
            ", "
          )}`
        )
      );
    }
    cb(null, true);
  };
};

export const uploadImage = multer({
  storage,
  fileFilter: fileFilter([".jpg", ".jpeg", ".png", ".webp"]),
  limits: { fileSize: 10 * 1024 * 1024 },
});
