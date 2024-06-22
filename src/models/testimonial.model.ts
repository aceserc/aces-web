import {
  MAX_LENGTH_NAME,
  MIN_LENGTH_CONTACT_BODY,
  MIN_LENGTH_NAME,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      minLength: MIN_LENGTH_CONTACT_BODY,
    },
    endorserContactUrl: {
      type: String,
      required: false,
    },
    endorserName: {
      type: String,
      required: true,
      minLength: MIN_LENGTH_NAME,
      maxLength: MAX_LENGTH_NAME,
    },
    endorserPosition: {
      type: String,
      required: false,
      minLength: MIN_LENGTH_TITLE,
    },
    endorserAvatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "testimonials",
  }
);

export default mongoose.models.TestimonialSchema ||
  mongoose.model("TestimonialSchema", TestimonialSchema);
