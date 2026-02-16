import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS (Vercel Frontend + Localhost)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://emergencyhelp.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/emergency", emergencyRoutes);

app.get("/", (req, res) => {
  res.send("EmergencyHelp Backend Running ✅");
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
