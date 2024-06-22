import {
  MAX_LENGTH_NAME,
  MIN_LENGTH_CONTACT_BODY,
  MIN_LENGTH_NAME,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      minLength: MIN_LENGTH_NAME,
      maxLength: MAX_LENGTH_NAME,
    },
    email: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
      minLength: MIN_LENGTH_TITLE,
    },
    body: {
      type: String,
      required: true,
      minLength: MIN_LENGTH_CONTACT_BODY,
    },
  },
  {
    timestamps: true,
    collection: "contacts",
  }
);

export default mongoose.models.ContactSchema ||
  mongoose.model("ContactSchema", ContactSchema);
