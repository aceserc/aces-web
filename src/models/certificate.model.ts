import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TrainingAndWorkshops",
    },
    issuedAt: {
      type: Date,
      required: true,
    },
    recipient: {
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      }, // "participant" | "tutor" | "mentor",
      team: {
        type: String, // if they are part of a team
      },
      position: {
        type: String, // if they secured a position
      },
    },
  },
  {
    timestamps: true,
    collection: "certificates",
  }
);

export default mongoose.models.CertificateSchema ||
  mongoose.model("CertificateSchema", CertificateSchema);
