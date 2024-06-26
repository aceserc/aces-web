"use client";
import EventCard from "@/components/reusable/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/use-fetch";
import API from "@/services";
import { IEventsSchemaResponse } from "@/services/events";
import React from "react";

type IUpcomingEvents = { data: IEventsSchemaResponse[] };

const UpcomingEvents = () => {
  const {
    data: upcomingEvents,
    isLoading,
    isError,
  } = useFetch<IUpcomingEvents>(API.upcomingEvents);

  if (
    isError ||
    (!isLoading && (!upcomingEvents || upcomingEvents?.data?.length === 0))
  ) {
    return null;
  }
  return (
    <div
      id="upcoming-events"
      className="bg-muted/40 rounded-lg w-full py-5 md:py-8"
    >
      <div className="flex flex-col gap-12 items-center justify-center wrapper">
        <div className="flex flex-col items-center gap-2 justify-center ">
          <h3 className="text-xl md:text-2xl font-bold">Upcoming Events</h3>
          <hr className="w-1/2" />
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex gap-6 w-full overflow-x-auto snap-x snap-mandatory">
            {isLoading ? (
              <>
                <Skeleton className="w-full min-w-full sm:min-w-[400px] sm:w-[400px] h-[300px] rounded-md snap-center" />
                <Skeleton className="w-full min-w-full sm:min-w-[400px] sm:w-[400px] h-[300px] rounded-md snap-center" />
                <Skeleton className="w-full min-w-full sm:min-w-[400px] sm:w-[400px] h-[300px] rounded-md snap-center" />
                <Skeleton className="w-full min-w-full sm:min-w-[400px] sm:w-[400px] h-[300px] rounded-md snap-center" />
              </>
            ) : (
              upcomingEvents?.data.map((event, i) => (
                <EventCard key={i} {...event} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
