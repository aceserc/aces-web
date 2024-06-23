import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";

export const GET = catchAsyncError(async () => {
  return sendNextResponse({
    status: 200,
    message: "Hello World",
  });
});
