import { MAX_LENGTH_NAME, MIN_LENGTH_NAME } from "@/constants/schema.constants";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: MIN_LENGTH_NAME,
      maxLength: MAX_LENGTH_NAME,
    },
    lastName: {
      type: String,
      minLength: MIN_LENGTH_NAME,
      maxLength: MAX_LENGTH_NAME,
    },
    email: {
      type: String,
      required: true,
    },
    loginMethod: {
      type: String,
      default: "normal",
      enum: ["normal", "oauth"],
    },
    password: {
      type: String,
      required: function (this: any) {
        return this.loginMethod === "normal";
      },
    },
    avatar: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export default mongoose.models.UserSchema ||
  mongoose.model("UserSchema", UserSchema);
