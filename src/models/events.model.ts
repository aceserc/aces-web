import {
  MARKDOWN_BODY_MIN_LENGTH,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import mongoose from "mongoose";
import { FileSchema } from "./file.schema";

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
    thumbnail: FileSchema,
    images: {
      type: [FileSchema],
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
