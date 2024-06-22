import {
  MARKDOWN_BODY_MIN_LENGTH,
  MAX_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
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
    authorId: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
      min: MIN_LENGTH_META_DESCRIPTION,
      max: MAX_LENGTH_META_DESCRIPTION,
    },
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

export default mongoose.models.BlogSchema ||
  mongoose.model("BlogSchema", BlogSchema);
