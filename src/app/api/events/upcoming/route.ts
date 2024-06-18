import { RESPONSES } from "@/constants/response.constant";
import dbConnect from "@/db/connect";
import omit from "@/helpers/omit";
import eventsModel from "@/models/events.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    let events: any[] = [];
    let type = "Upcoming Events";

    // find max 4 events that are upcoming or today
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    events = await eventsModel
      .find({
        startDate: { $gte: today },
      })
      .sort({ startDate: -1 })
      .limit(4);

    // if no upcoming events, find max 4 events that are most recent
    if (!events || events.length === 0) {
      events = await eventsModel.find().sort({ startDate: -1 }).limit(4);
      type = "Recent Events";
    }

    return NextResponse.json({
      data: events.map((event) => omit(event.toJSON(), ["body", "images"])),
      type,
    });
  } catch (e) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};
