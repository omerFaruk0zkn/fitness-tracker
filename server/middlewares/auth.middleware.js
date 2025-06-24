import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) throw new AppError(401, "Yetkisiz erişim");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) throw new AppError(401, "Geçersiz token");

  req.user = await User.findById(decoded.id);
  next();
});

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  }
};
