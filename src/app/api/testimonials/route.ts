import { NextRequest } from "next/server";
import { TestimonialSchema } from "@/zod/testimonial";
import testimonialModel from "@/models/testimonial.model";
import { applyMiddleware } from "@/middlewares/apply.middleware";
import { isAdminMiddleware } from "@/middlewares/auth.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import { zodValidator } from "@/middlewares/zod.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const getAll = req.nextUrl.searchParams.get("all");
    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
    const order = req.nextUrl.searchParams.get("order") || "desc";
    const search = req.nextUrl.searchParams.get("search") || ""; // search by endorserName case insensitive

    // find  relevant testimonial
    if (getAll === "true") {
      const testimonial = await testimonialModel
        .find({})
        .sort({ createdAt: -1 });

      return sendNextResponse({
        status: 200,
        data: testimonial || [],
      });
    }

    const testimonial = await testimonialModel
      .find({
        endorserName: { $regex: new RegExp(search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit);

    const totalContacts = await testimonialModel.countDocuments({
      name: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, totalContacts - pageNo * limit);
    const totalPages = Math.ceil(totalContacts / limit);

    return sendNextResponse({
      status: 200,
      data: {
        testimonials: testimonial || [],
        pageNo: pageNo,
        results: testimonial.length,
        total: totalContacts,
        remainingResults,
        totalPages,
        resultsOnNextPage:
          remainingResults > 0 ? Math.min(remainingResults, limit) : 0,
      },
    });
  })
);

export const POST = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  zodValidator(TestimonialSchema),
  catchAsyncError(async (req: NextRequest) => {
    //@ts-ignore
    const body = req.data.body;
    const testimonial = await testimonialModel.create(body);
    await testimonial.save();
    return sendNextResponse({
      status: 201,
      message: "Testimonial added successfully",
    });
  })
);

export const DELETE = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const testimonialId = req.nextUrl.searchParams.get("id");
    if (!testimonialId) {
      return sendNextResponse({
        status: 400,
        message: "Testimonial id is required!",
      });
    }

    await testimonialModel.findByIdAndDelete(testimonialId);

    return sendNextResponse({
      status: 200,
      message: "Testimonial deleted successfully!",
    });
  })
);
