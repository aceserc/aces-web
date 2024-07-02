import {
  MARKDOWN_BODY_MIN_LENGTH,
  MAX_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import mongoose from "mongoose";
import { FileSchema } from "./file.schema";

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
    thumbnail: FileSchema,
    images: {
      type: [FileSchema],
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
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

export default mongoose.models.BlogSchema ||
  mongoose.model("BlogSchema", BlogSchema);
