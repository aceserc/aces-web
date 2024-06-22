import { RESPONSES } from "@/constants/response.constant";
import dbConnect from "@/db/connect";
import omit from "@/helpers/omit";
import eventsModel from "@/models/events.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    let events: any[] = [];

    // find max 4 events that are upcoming or today
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    events = await eventsModel
      .find({
        startDate: { $gte: today },
      })
      .sort({ startDate: -1 })
      .limit(4)
      .select("-body -images");

    return NextResponse.json({
      data: events,
    });
  } catch (e) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};
