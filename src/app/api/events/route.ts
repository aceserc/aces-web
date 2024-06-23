import eventsModel from "@/models/events.model";
import { EventsSchemaExtended } from "@/zod/events.schema";
import { NextRequest } from "next/server";
import { applyMiddleware } from "@/middlewares/apply.middleware";
import { isAdminMiddleware } from "@/middlewares/auth.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { zodValidator } from "@/middlewares/zod.middleware";
import { sendNextResponse } from "@/middlewares/send-response";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const eventId = req.nextUrl.searchParams.get("id");

    if (eventId) {
      const event = await eventsModel.findById(eventId);

      if (!event) {
        return sendNextResponse({
          status: 404,
          message: "Event not found!",
        });
      }

      return sendNextResponse({
        status: 200,
        data: event.toJSON(),
      });
    }

    const onlyIds = req.nextUrl.searchParams.get("onlyIds");

    if (onlyIds === "true") {
      const events = await eventsModel.find().select("_id");

      return sendNextResponse({
        status: 200,
        data: events || [],
      });
    }

    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "9");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "createdAt";
    const order = req.nextUrl.searchParams.get("order") || "desc";

    // search by title case insensitive
    const search = req.nextUrl.searchParams.get("search") || "";

    const events = await eventsModel
      .find({
        title: { $regex: new RegExp(search, "i") },
      })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit)
      .select("-body -__v -images -registrationLink");

    const totalEvents = await eventsModel.countDocuments({
      title: { $regex: new RegExp(search, "i") },
    });

    const remainingResults = Math.max(0, totalEvents - pageNo * limit);
    const totalPages = Math.ceil(totalEvents / limit);

    return sendNextResponse({
      status: 200,
      data: {
        events: events || [],
        pageNo: pageNo,
        results: events.length,
        total: totalEvents,
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
  zodValidator(EventsSchemaExtended),
  catchAsyncError(async (req: NextRequest) => {
    // @ts-ignore
    const body = req.data.body;
    const event = await eventsModel.create(body);
    await event.save();

    return sendNextResponse({
      status: 201,
      message: "Event published successfully!",
    });
  })
);

export const DELETE = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const eventId = req.nextUrl.searchParams.get("id");

    if (!eventId) {
      return sendNextResponse({
        status: 400,
        message: "Please provide an id!",
      });
    }

    await eventsModel.findByIdAndDelete(eventId);

    return sendNextResponse({
      status: 200,
      message: "Event deleted successfully!",
    });
  })
);
