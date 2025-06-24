import User from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, height } = req.body;

  if (!name || !email || !password || !height) {
    throw new AppError(400, "Tüm alanlar zorunludur");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError(400, "Email zaten kayıtlı");

  const user = await User.create({
    name,
    email,
    password,
    height: parseFloat(height.replace(",", ".")),
  });

  const token = generateToken(user._id);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({ message: "Kayıt başarılı! Hoş geldiniz", user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError(400, "Geçersiz e-posta veya şifre");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AppError(400, "Geçersiz e-posta veya şifre");

  const token = generateToken(user._id);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ message: "Giriş başarılı", user });
});

export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate("progresses");

  if (!user) throw new AppError(404, "Kullanıcı bulunamadı");

  res.status(200).json({ user });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Çıkış yapıldı" });
});
