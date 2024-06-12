import { MAX_LENGTH_NAME, MIN_LENGTH_NAME } from "@/constants/schema.constants";
import mongoose from "mongoose";

const CommitteeMemberModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: MIN_LENGTH_NAME,
      maxLength: MAX_LENGTH_NAME,
    },
    post: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    socialLinks: {
      type: [String],
    },
  },
  {
    timestamps: true,
    collection: "committee_members",
  }
);

export default mongoose.models.CommitteeMemberModel ||
  mongoose.model("CommitteeMemberModel", CommitteeMemberModel);
