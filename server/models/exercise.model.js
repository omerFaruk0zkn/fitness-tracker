import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    muscleGroup: {
      type: String,
      enum: ["Göğüs", "Sırt", "Bacak", "Kol", "Omuz", "Karın", "Full Vücut"],
      required: true,
    },
    video: {
      url: { type: String, required: true },
      publicId: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Exercise", exerciseSchema);
