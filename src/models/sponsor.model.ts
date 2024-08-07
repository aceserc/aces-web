import { MAX_LENGTH_NAME, MIN_LENGTH_NAME } from "@/constants/schema.constants";
import mongoose from "mongoose";
import { FileSchema } from "./file.schema";

const SponsorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: MIN_LENGTH_NAME,
      maxLength: MAX_LENGTH_NAME,
    },
    website: {
      type: String,
    },
    logo: FileSchema,
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "sponsors",
  }
);

export default mongoose.models.SponsorSchema ||
  mongoose.model("SponsorSchema", SponsorSchema);
