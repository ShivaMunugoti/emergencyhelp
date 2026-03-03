import express from "express";
import {
  register,
  login,
  forgotPasswordSendOtp,
  forgotPasswordVerifyOtp,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/forgot-password/send-otp", forgotPasswordSendOtp);
router.post("/forgot-password/verify-otp", forgotPasswordVerifyOtp);

export default router;
