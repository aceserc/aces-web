import { NextResponse } from "next/server";

// Health check route
export const GET = async () => {
  return NextResponse.json({
    message: "Hello World!",
  });
};
