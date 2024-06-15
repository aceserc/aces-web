import { RESPONSES } from "@/constants/response.constant";
import dbConnect from "@/db/connect";
import { isAdmin } from "@/helpers/is-admin";
import omit from "@/helpers/omit";
import eventsModel from "@/models/events.model";
import { EventsSchemaExtended } from "@/zod/events.schema";
import { NextRequest, NextResponse } from "next/server";

/**
 *  Handles the POST request for adding a event.
 *
 * @body title - The title of the event.
 * @body body - The body of the event.
 * @body thumbnail - The thumbnail of the event.
 * @body images - The images of the event. @optional
 * @body metaDescription - The meta description of the event.
 *
 */
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
      return NextResponse.json(
        {
          ...RESPONSES.UNPROCESSABLE_ENTITY,
          errors: JSON.stringify(e),
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
 *
 * @query id - The id of the event to fetch. @optional
 *
 * @returns data - The list of events or a event.
 */
export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    const events = await eventsModel.find().sort({ startDate: -1 });

    const eventId = req.nextUrl.searchParams.get("id");

    if (eventId) {
      const event = await eventsModel.findById(eventId);

      if (!event) {
        return NextResponse.json(
          { ...RESPONSES.NOT_FOUND, message: "Events not found" },
          {
            status: RESPONSES.NOT_FOUND.status,
          }
        );
      }

      return NextResponse.json({
        data: event.toJSON(),
      });
    }

    return NextResponse.json({
      data: events.map((event) => omit(event.toJSON(), ["body", "images"])),
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
