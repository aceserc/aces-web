import { NextResponse } from "next/server";

// GET /api/route
// Health check route
export const GET = async () => {
  return NextResponse.json({
    message: "Hello World!",
    from: "ACES",
  });
};
