import mongoose from "mongoose";

export const FileSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
});
