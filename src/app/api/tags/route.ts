import { applyMiddleware } from "@/middlewares/apply.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import tagsModel from "@/models/tags.model";
import { NextRequest } from "next/server";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const type = req.nextUrl.searchParams.get("type");
    const tags = await tagsModel.findOne({ name: type });

    return sendNextResponse({
      status: 200,
      data: tags,
    });
  })
);
