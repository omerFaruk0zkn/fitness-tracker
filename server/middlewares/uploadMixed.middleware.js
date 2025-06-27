import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (allowedExts, typeName) => (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExts.includes(ext)) {
    return cb(
      new Error(
        `${typeName} sadece şu uzantılara izin verir: ${allowedExts.join(", ")}`
      )
    );
  }
  cb(null, true);
};

const mixedUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "video") {
      return fileFilter([".mp4", ".mov", ".avi"], "Video")(req, file, cb);
    } else if (file.fieldname === "image") {
      return fileFilter([".jpg", ".jpeg", ".png", ".webp"], "Resim")(
        req,
        file,
        cb
      );
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 },
});

export const uploadBoth = mixedUpload.fields([
  { name: "video", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);
