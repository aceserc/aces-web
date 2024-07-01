import { applyMiddleware } from "@/middlewares/apply.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import blogsModel from "@/models/blogs.model";
import { NextRequest } from "next/server";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    let onlyTags = req.nextUrl.searchParams.get("onlyTags");
    if (onlyTags === "true") {
      let tags = await blogsModel.find().distinct("tags");
      return sendNextResponse({
        status: 200,
        data: tags,
      });
    } else {
      return sendNextResponse({
        status: 400,
        message: "Invalid request",
      });
    }
  })
);
