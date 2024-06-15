import {
  MARKDOWN_BODY_MIN_LENGTH,
  MAX_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema(
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
    startDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
    },
    endDate: {
      type: Date,
    },
    endTime: {
      type: String,
    },
    location: {
      type: String,
    },
    registrationLink: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "events",
  }
);

export default mongoose.models.EventsSchema ||
  mongoose.model("EventsSchema", EventsSchema);
