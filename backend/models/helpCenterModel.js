const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const helpCenterSchema = new mongoose.Schema(
  {
    ticketId: { type: String, default: uuidv4(), unique: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issue: { type: String, required: true },
    department: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in progress", "resolved", "closed"],
      default: "open",
    },
    dateOfCreation: { type: Date, default: Date.now },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resolvedDate: { type: Date },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const HelpCenter = mongoose.model("HelpCenter", helpCenterSchema);

module.exports = HelpCenter;
