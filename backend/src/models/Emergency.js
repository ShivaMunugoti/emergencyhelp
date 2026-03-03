import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },

    emergencyType: {
      type: String,
      enum: ["Ambulance", "Police", "Hospital", "Accident"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Resolved"],
      default: "Pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Emergency", emergencySchema);
