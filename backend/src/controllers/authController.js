import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const ADMIN_EMAIL = "munugotishivasai123@gmail.com";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// =============================
// REGISTER
// =============================
export const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.trim().toLowerCase();

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = email === ADMIN_EMAIL ? "admin" : "user";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user._id);

    res.json({
      message: "Registered successfully",
      token,
      role: user.role,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.log("REGISTER ERROR:", err.message);
    res.status(500).json({ message: "Register failed" });
  }
};

// =============================
// LOGIN
// =============================
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    res.status(500).json({ message: "Login failed" });
  }
};

// =============================
// FORGOT PASSWORD (SEND OTP)
// =============================
export const forgotPasswordSendOtp = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email required" });

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.forgotOtp = otp;
    user.forgotOtpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await sendEmail(
      user.email,
      "EmergencyHelp Password Reset OTP",
      `Your OTP for password reset is: ${otp}\n\nThis OTP will expire in 5 minutes.\n\n- EmergencyHelp`
    );

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.log("FORGOT OTP ERROR:", err.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// =============================
// FORGOT PASSWORD (VERIFY OTP + RESET)
// =============================
export const forgotPasswordVerifyOtp = async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, OTP and new password required" });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.forgotOtp || !user.forgotOtpExpires) {
      return res.status(400).json({ message: "OTP not generated" });
    }

    if (user.forgotOtpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.forgotOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.forgotOtp = null;
    user.forgotOtpExpires = null;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.log("FORGOT VERIFY ERROR:", err.message);
    res.status(500).json({ message: "Password reset failed" });
  }
};
