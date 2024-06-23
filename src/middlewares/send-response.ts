import { STATUS } from "@/constants/status.constant";
import { NextResponse } from "next/server";

export interface IResponse {
  status: number;
  message?: string;
  statusText?: string;
  error?: any;
  data?: any;
}

export const sendNextResponse = (res: IResponse) => {
  return NextResponse.json(
    {
      ...STATUS[res.status || 200],
      ...res,
      error: res.error ? JSON.stringify(res.error) : undefined,
    },
    {
      status: res.status || 200,
    }
  );
};
