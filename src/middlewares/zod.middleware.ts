import { NextRequest, NextResponse } from "next/server";
import { fromError } from "zod-validation-error";
import { sendNextResponse } from "./send-response";
import { CALL_NEXT_FUNCTION } from "./apply.middleware";

export const zodValidator = (schema: any) => {
  return async (req: NextRequest, res: NextResponse) => {
    try {
      // @ts-ignore
      if (!req.data) {
        // @ts-ignore
        req.data = {} as any;
      }
      let body = await req.json();
      // @ts-ignore
      req.data.body = schema.parse(body);
      return CALL_NEXT_FUNCTION;
    } catch (e) {
      const message = fromError(e).toString();
      return sendNextResponse({
        status: 422,
        message,
        error: e,
      });
    }
  };
};
