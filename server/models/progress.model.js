import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    shoulder: {
      type: Number,
      required: true,
    },
    chest: {
      type: Number,
      required: true,
    },
    waist: {
      type: Number,
      required: true,
    },
    hip: {
      type: Number,
      required: true,
    },
    arm_right: {
      type: Number,
      required: true,
    },
    arm_left: {
      type: Number,
      required: true,
    },
    leg: {
      type: Number,
      required: true,
    },
    abdominal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
