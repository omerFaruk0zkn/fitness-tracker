import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImg: {
      url: String,
      publicId: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    height: Number,
    weight: Number,
    target_weight: Number,
    progresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Progress",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.set("toJSON", {
  transform: function (_, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.set("toObject", {
  transform: function (_, ret) {
    delete ret.password;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
