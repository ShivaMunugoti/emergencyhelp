import express from "express";
import {
  createEmergency,
  getMyEmergencies,
  getAllEmergencies,
  updateEmergency,
  deleteEmergency,
} from "../controllers/emergencyController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// USER ROUTES
router.post("/create", protect, createEmergency);
router.get("/my", protect, getMyEmergencies);

// ADMIN ROUTES (PROTECTED)
router.get("/all", protect, isAdmin, getAllEmergencies);
router.put("/update/:id", protect, isAdmin, updateEmergency);
router.delete("/delete/:id", protect, isAdmin, deleteEmergency);

export default router;
