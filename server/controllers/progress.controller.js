import Progress from "../models/progress.model.js";
import User from "../models/user.model.js";
import PDFDocument from "pdfkit-table";
import path from "path";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProgress = asyncHandler(async (req, res) => {
  const { date, weight, shoulder, chest, waist, hip, arm_right, arm_left } =
    req.body;

  const existing = await Progress.findOne({ userId: req.user._id, date });
  if (existing) throw new AppError(400, "Bu tarih için veri zaten mevcut");

  if (
    !date ||
    !weight ||
    !shoulder ||
    !chest ||
    !waist ||
    !hip ||
    !arm_right ||
    !arm_left
  ) {
    throw new AppError(400, "Tüm alanlar zorunludur");
  }

  const progress = await Progress.create({
    userId: req.user._id,
    date,
    weight: parseFloat(weight.replace(",", ".")),
    shoulder: parseFloat(shoulder.replace(",", ".")),
    chest: parseFloat(chest.replace(",", ".")),
    waist: parseFloat(waist.replace(",", ".")),
    hip: parseFloat(hip.replace(",", ".")),
    arm_right: parseFloat(arm_right.replace(",", ".")),
    arm_left: parseFloat(arm_left.replace(",", ".")),
  });

  await User.findByIdAndUpdate(req.user._id, {
    $push: { progresses: progress._id },
  });

  res.status(200).json({ message: "Veri kaydedildi", progress });
});

export const getProgressData = asyncHandler(async (req, res) => {
  const data = await Progress.find({ userId: req.user._id }).sort({ date: 1 });
  res.status(200).json(data);
});

export const updateProgress = asyncHandler(async (req, res) => {
  const { date, weight, shoulder, chest, waist, hip, arm_right, arm_left } =
    req.body;
  const { progressId } = req.params;

  const progress = await Progress.findById(progressId);
  if (!progress) throw new AppError(404, "Progress bulunamadı");

  const updatedProgress = await Progress.findByIdAndUpdate(
    progressId,
    {
      date,
      weight: parseFloat(weight.replace(",", ".")),
      shoulder: parseFloat(shoulder.replace(",", ".")),
      chest: parseFloat(chest.replace(",", ".")),
      waist: parseFloat(waist.replace(",", ".")),
      hip: parseFloat(hip.replace(",", ".")),
      arm_right: parseFloat(arm_right.replace(",", ".")),
      arm_left: parseFloat(arm_left.replace(",", ".")),
    },
    { new: true }
  );

  res
    .status(200)
    .json({ message: "Veri güncellendi", progress: updatedProgress });
});

export const deleteProgress = asyncHandler(async (req, res) => {
  const { progressId } = req.params;

  const progress = await Progress.findById(progressId);
  if (!progress) throw new AppError(404, "Progress bulunamadı");

  await Progress.findByIdAndDelete(progressId);

  res.status(200).json({ message: "Veri silindi" });
});

export const exportProgressToPDF = asyncHandler(async (req, res) => {
  const progressList = await Progress.find({ userId: req.user._id }).sort({
    date: 1,
  });

  const doc = new PDFDocument({ margin: 20, size: "A4" });
  const fontPath = path.join(process.cwd(), "fonts", "Roboto.ttf");

  if (!progressList.length) {
    doc.fontSize(12).text("Herhangi bir veri bulunamadı.");
    doc.end();
    return;
  }

  doc.registerFont("TurkishFont", fontPath);
  doc.font("TurkishFont");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=progress.pdf");
  doc.pipe(res);

  doc.fontSize(18).text("Gelişim Takibi Raporu", { align: "center" });
  doc.moveDown(1);

  (async function createTable() {
    const table = {
      headers: [
        "Tarih",
        "Kilo",
        "Omuz Ölçüsü",
        "Göğüs Ölçüsü",
        "Bel Ölçüsü",
        "Kalça Ölçüsü",
        "Sağ Kol Ölçüsü",
        "Sol Kol Ölçüsü",
      ],
      rows: progressList.map((progress) => [
        new Date(progress.date).toLocaleDateString("tr-TR"),
        `${progress.weight ?? "-"} kg`,
        `${progress.shoulder ?? "-"} cm`,
        `${progress.chest ?? "-"} cm`,
        `${progress.waist ?? "-"} cm`,
        `${progress.hip ?? "-"} cm`,
        `${progress.arm_right ?? "-"} cm`,
        `${progress.arm_left ?? "-"} cm`,
      ]),
    };

    await doc.table(table, {
      prepareHeader: () => doc.font("TurkishFont").fontSize(12),
      prepareRow: () => doc.font("TurkishFont").fontSize(10),
    });

    doc.end();
  })();
});
