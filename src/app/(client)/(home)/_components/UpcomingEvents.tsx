"use client";
import EventCard from "@/components/reusable/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/use-fetch";
import API from "@/services";
import { IEventsSchemaResponse } from "@/services/events";
import React from "react";

type IUpcomingEvents = { data: IEventsSchemaResponse[]; type: string };

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
          <h3 className="text-xl md:text-2xl font-bold">
            {upcomingEvents?.type ?? <Skeleton className="h-8 w-48" />}
          </h3>
          <hr className="w-1/2" />
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex gap-12 w-full overflow-x-auto">
            {isLoading ? (
              <>
                <Skeleton className="w-full sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] rounded-md sm:min-w-[400px] md:min-w-[500px]" />
                <Skeleton className="w-full sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] rounded-md sm:min-w-[400px] md:min-w-[500px]" />
                <Skeleton className="w-full sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] rounded-md sm:min-w-[400px] md:min-w-[500px]" />
                <Skeleton className="w-full sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] rounded-md sm:min-w-[400px] md:min-w-[500px]" />
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
