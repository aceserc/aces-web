import { applyMiddleware } from "@/middlewares/apply.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import eventsModel from "@/models/events.model";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async () => {
    // find max 4 events that are upcoming or today
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const events = await eventsModel
      .find({
        startDate: { $gte: today },
      })
      .sort({ startDate: -1 })
      .limit(4)
      .select("-body -images");

    return sendNextResponse({
      status: 200,
      data: events,
    });
  })
);
