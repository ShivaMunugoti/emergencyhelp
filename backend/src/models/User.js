import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Forgot password OTP
    forgotOtp: { type: String, default: null },
    forgotOtpExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
