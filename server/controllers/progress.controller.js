import Progress from "../models/progress.model.js";
import User from "../models/user.model.js";
import PDFDocument from "pdfkit-table";
import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProgress = asyncHandler(async (req, res) => {
  const {
    date,
    weight,
    shoulder,
    chest,
    waist,
    hip,
    arm_right,
    arm_left,
    leg,
    abdominal,
  } = req.body;

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
    !arm_left ||
    !leg ||
    !abdominal
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
    leg: parseFloat(leg.replace(",", ".")),
    abdominal: parseFloat(abdominal.replace(",", ".")),
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
  const {
    date,
    weight,
    shoulder,
    chest,
    waist,
    hip,
    arm_right,
    arm_left,
    leg,
    abdominal,
  } = req.body;
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
      leg: parseFloat(leg.replace(",", ".")),
      abdominal: parseFloat(abdominal.replace(",", ".")),
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

  const doc = new PDFDocument({ margin: 5, size: "A4" });
  const fontPath = path.join(__dirname, "..", "fonts", "Roboto.ttf");

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
        "Kilo (KG)",
        "Omuz (CM)",
        "Göğüs (CM)",
        "Bel (CM)",
        "Kalça (CM)",
        "Sağ Kol (CM)",
        "Sol Kol (CM)",
        "Bacak (CM)",
        "Karın (CM)",
      ],
      rows: progressList.map((progress) => [
        new Date(progress.date).toLocaleDateString("tr-TR"),
        `${progress.weight ?? "-"}`,
        `${progress.shoulder ?? "-"}`,
        `${progress.chest ?? "-"}`,
        `${progress.waist ?? "-"}`,
        `${progress.hip ?? "-"}`,
        `${progress.arm_right ?? "-"}`,
        `${progress.arm_left ?? "-"}`,
        `${progress.leg ?? "-"}`,
        `${progress.abdominal ?? "-"}`,
      ]),
    };

    await doc.table(table, {
      prepareHeader: () => doc.font("TurkishFont").fontSize(9),
      prepareRow: () => doc.font("TurkishFont").fontSize(8),
    });

    doc.end();
  })();
});
