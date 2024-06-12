import {
  MARKDOWN_BODY_MIN_LENGTH,
  MAX_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
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
    metaDescription: {
      type: String,
      minLength: MIN_LENGTH_META_DESCRIPTION,
      maxLength: MAX_LENGTH_META_DESCRIPTION,
    },
  },
  {
    timestamps: true,
    collection: "notices",
  }
);

export default mongoose.models.NoticeSchema ||
  mongoose.model("NoticeSchema", NoticeSchema);
