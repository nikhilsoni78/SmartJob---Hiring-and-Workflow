const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },

    candidate: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["APPLIED", "SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"],
      default: "APPLIED",
    },
  },
  { timestamps: true }
);

ApplicationSchema.index({ job: 1, candidate: 1 },{ unique: true });

module.exports = mongoose.model("Application", ApplicationSchema);
