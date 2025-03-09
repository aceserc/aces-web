import { NextRequest, NextResponse } from "next/server";
import { sendNextResponse } from "./send-response";

const catchAsyncError = (fn: (req: NextRequest, res?: NextResponse) => any) => {
  return async (req: NextRequest, res: NextResponse) => {
    try {
      return await fn(req, res);
    } catch (e) {
      console.error(e);
      return sendNextResponse({
        status: 500,
        error: e,
      });
    }
  };
};

export default catchAsyncError;
