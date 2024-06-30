import { NextRequest } from "next/server";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { applyMiddleware } from "@/middlewares/apply.middleware";
import noticeModel from "@/models/notice.model";
import { sendNextResponse } from "@/middlewares/send-response";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    // 3 notices that are posted in last 2 days
    const notices = await noticeModel
      .find({
        createdAt: {
          $gte: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
      })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("-body -__v -images");

    // send response
    return sendNextResponse({
      status: 200,
      data: notices,
    });
  })
);
