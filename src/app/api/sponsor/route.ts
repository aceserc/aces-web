import sponsorModel from "@/models/sponsor.model";
import { SponsorSchema as ZodSponsorSchema } from "@/zod/sponsor.schema";
import { NextRequest } from "next/server";
import { applyMiddleware } from "@/middlewares/apply.middleware";
import { isAdminMiddleware } from "@/middlewares/auth.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import { zodValidator } from "@/middlewares/zod.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";

export const POST = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  zodValidator(ZodSponsorSchema),
  catchAsyncError(async (req: NextRequest) => {
    //@ts-ignore
    const body = req.data.body;
    const sponsor = await sponsorModel.create(body);
    await sponsor.save();
    return sendNextResponse({
      status: 201,
      message: "Sponsor added successfully!",
    });
  })
);

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const search = req.nextUrl.searchParams.get("search") || ""; // search by title case insensitive

    // find  relevant sponsors
    const sponsors = await sponsorModel
      .find({
        name: { $regex: new RegExp(search, "i") },
      })
      .sort({ createdAt: -1 })
      .select("-__v");

    return sendNextResponse({
      status: 200,
      data: sponsors || [],
    });
  })
);

export const DELETE = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const sponsorId = req.nextUrl.searchParams.get("id");
    if (!sponsorId) {
      return sendNextResponse({
        status: 400,
        message: "Sponsor id is required!",
      });
    }

    await sponsorModel.findByIdAndDelete(sponsorId);

    return sendNextResponse({
      status: 200,
      message: "Sponsor deleted successfully!",
    });
  })
);
