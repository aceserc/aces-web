import catchAsyncError from "@/constants/error-handler";
import { sendNextResponse } from "@/constants/send-response";

export const GET = catchAsyncError(async () => {
  return sendNextResponse({
    status: 200,
    message: "Hello World",
  });
});
