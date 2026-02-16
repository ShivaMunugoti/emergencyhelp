import Emergency from "../models/Emergency.js";

// =============================
// ✅ CREATE EMERGENCY (USER)
// =============================
export const createEmergency = async (req, res) => {
  try {
    const { title, description, location, emergencyType } = req.body;

    if (!title || !description || !location || !emergencyType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emergency = await Emergency.create({
      title,
      description,
      location,
      emergencyType,
      createdBy: req.user._id,

      status: "Pending",

      // ✅ history starts here
      statusHistory: [{ status: "Pending", updatedAt: new Date() }],
    });

    res.json({
      message: "Emergency created successfully",
      emergency,
    });
  } catch (err) {
    console.log("CREATE EMERGENCY ERROR:", err.message);
    res.status(500).json({ message: "Failed to create emergency" });
  }
};

// =============================
// ✅ GET MY EMERGENCIES (USER)
// =============================
export const getMyEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(emergencies);
  } catch (err) {
    console.log("MY EMERGENCY ERROR:", err.message);
    res.status(500).json({ message: "Failed to load emergencies" });
  }
};

// =============================
// ✅ GET ALL EMERGENCIES (ADMIN)
// =============================
export const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(emergencies);
  } catch (err) {
    console.log("ALL EMERGENCY ERROR:", err.message);
    res.status(500).json({ message: "Failed to load all emergencies" });
  }
};

// =============================
// ✅ UPDATE EMERGENCY STATUS (ADMIN)
// =============================
export const updateEmergency = async (req, res) => {
  try {
    const { status } = req.body;

    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({ message: "Emergency not found" });
    }

    // ✅ FIX FOR OLD RECORDS (important)
    if (!emergency.statusHistory) {
      emergency.statusHistory = [];
    }

    // Update only if status changed
    if (status && status !== emergency.status) {
      emergency.status = status;

      emergency.statusHistory.push({
        status,
        updatedAt: new Date(),
      });
    }

    await emergency.save();

    res.json({
      message: "Emergency updated successfully",
      emergency,
    });
  } catch (err) {
    console.log("UPDATE EMERGENCY ERROR:", err.message);
    res.status(500).json({ message: "Failed to update emergency" });
  }
};

// =============================
// ✅ DELETE EMERGENCY (ADMIN)
// =============================
export const deleteEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({ message: "Emergency not found" });
    }

    await emergency.deleteOne();

    res.json({ message: "Emergency deleted successfully" });
  } catch (err) {
    console.log("DELETE EMERGENCY ERROR:", err.message);
    res.status(500).json({ message: "Failed to delete emergency" });
  }
};
