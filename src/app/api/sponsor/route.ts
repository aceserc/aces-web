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
    const sponsorId = req.nextUrl.searchParams.get("id");
    if (sponsorId) {
      const sponsor = await sponsorModel.findById(sponsorId);
      if (!sponsor) {
        return sendNextResponse({
          status: 404,
          message: "Sponsor not found!",
        });
      }

      return sendNextResponse({
        status: 200,
        data: sponsor.toJSON(),
      });
    }

    // return only ids if onlyIds is present
    const onlyIds = req.nextUrl.searchParams.get("onlyIds");
    if (onlyIds === "true") {
      const sponsors = await sponsorModel.find().select("_id");
      return sendNextResponse({
        status: 200,
        data: sponsors.map((sponsor) => sponsor._id),
      });
    }

    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "name";
    const order = req.nextUrl.searchParams.get("order") || "asc";
    const search = req.nextUrl.searchParams.get("search") || ""; // search by title case insensitive

    // find  relevant sponsors
    const sponsors = await sponsorModel
      .find({
        name: { $regex: new RegExp(search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit)
      .select("-__v");

    const totalSponsors = await sponsorModel.countDocuments({
      name: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, totalSponsors - pageNo * limit);
    const totalPages = Math.ceil(totalSponsors / limit);

    return sendNextResponse({
      status: 200,
      data: {
        sponsors: sponsors || [],
        pageNo: pageNo,
        results: sponsors.length,
        total: totalSponsors,
        remainingResults,
        totalPages,
      },
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
