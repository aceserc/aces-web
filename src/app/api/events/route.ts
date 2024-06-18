import { RESPONSES } from "@/constants/response.constant";
import dbConnect from "@/db/connect";
import { isAdmin } from "@/helpers/is-admin";
import omit from "@/helpers/omit";
import eventsModel from "@/models/events.model";
import { EventsSchemaExtended } from "@/zod/events.schema";
import { fromError } from "zod-validation-error";
import { NextRequest, NextResponse } from "next/server";

// handle POST request for adding a event
export const POST = async (req: NextRequest) => {
  try {
    // connect to database and parse request body
    await dbConnect();

    if (!(await isAdmin())) {
      return NextResponse.json(RESPONSES.UNAUTHORIZED_ACCESS, {
        status: RESPONSES.UNAUTHORIZED_ACCESS.status,
      });
    }

    let body = await req.json();

    try {
      body = EventsSchemaExtended.parse(body);
    } catch (e) {
      const message = fromError(e).toString();
      return NextResponse.json(
        {
          ...RESPONSES.UNPROCESSABLE_ENTITY,
          errors: JSON.stringify(e),
          message,
        },
        {
          status: RESPONSES.UNPROCESSABLE_ENTITY.status,
        }
      );
    }

    const event = await eventsModel.create(body);
    await event.save();

    return NextResponse.json(
      {
        ...RESPONSES.CREATED,
        message: "Events published successfully!",
      },
      {
        status: RESPONSES.CREATED.status,
      }
    );
  } catch (e) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};

/**
 * Handles the GET request for fetching all events.
 * sortBy: startDate, endDate, createdAt, updatedAt, title
 * order: asc, desc
 * limit: number
 * page: number
 * search: string // search by title
 * onlyIds: boolean // return only ids
 */
export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    // find by id if id is present in query
    const eventId = req.nextUrl.searchParams.get("id");
    if (eventId) {
      const event = await eventsModel.findById(eventId);
      if (!event) {
        return NextResponse.json(
          { ...RESPONSES.NOT_FOUND, message: "Event not found!" },
          {
            status: RESPONSES.NOT_FOUND.status,
          }
        );
      }

      return NextResponse.json({
        data: event.toJSON(),
      });
    }

    // return only ids if onlyIds is present in query
    const onlyIds = req.nextUrl.searchParams.get("onlyIds");
    if (onlyIds === "true") {
      const events = await eventsModel.find().select("_id");
      return NextResponse.json({
        data: events.map((event) => event._id),
      });
    }

    const pageNo = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "startDate";
    const order = req.nextUrl.searchParams.get("order") || "desc";
    const search = req.nextUrl.searchParams.get("search") || ""; // search by title case insensitive

    // find  relevant events
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

    return NextResponse.json({
      data: events || [],
      pageNo: pageNo,
      results: events.length,
      total: totalEvents,
      remainingResults,
      totalPages,
      resultsOnNextPage:
        remainingResults > 0 ? Math.min(remainingResults, limit) : 0,
    });
  } catch (e) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};

/**
 *  Handles the DELETE request for deleting a event.
 *
 * @query id - The id of the event to delete.
 */
export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();

    if (!(await isAdmin())) {
      return NextResponse.json(RESPONSES.UNAUTHORIZED_ACCESS, {
        status: RESPONSES.UNAUTHORIZED_ACCESS.status,
      });
    }

    const id = req.nextUrl.searchParams.get("id");

    const event = await eventsModel.findByIdAndDelete(id);

    if (!event) {
      return NextResponse.json(
        { ...RESPONSES.NOT_FOUND, message: "Events not found" },
        {
          status: RESPONSES.NOT_FOUND.status,
        }
      );
    }

    return NextResponse.json(
      {
        ...RESPONSES.SUCCESS,
        message: "Events deleted successfully",
      },
      {
        status: RESPONSES.SUCCESS.status,
      }
    );
  } catch (e) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};
