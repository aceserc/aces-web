import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "tags",
  }
);

export default mongoose.models.TagSchema ||
  mongoose.model("TagSchema", TagSchema);
