import {
  MARKDOWN_BODY_MIN_LENGTH,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import mongoose from "mongoose";

const NoticesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: MIN_LENGTH_TITLE,
    },
    body: {
      type: String,
      required: true,
      minLength: MARKDOWN_BODY_MIN_LENGTH,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
    collection: "notices",
  }
);

export default mongoose.models.NoticesSchema ||
  mongoose.model("NoticesSchema", NoticesSchema);
