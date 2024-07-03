import mongoose from "mongoose";
import { FileSchema } from "./file.schema";

const GallerySchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
    },
    image: FileSchema,
  },
  {
    timestamps: true,
    collection: "gallery",
  }
);

export default mongoose.models.GallerySchema ||
  mongoose.model("GallerySchema", GallerySchema);
