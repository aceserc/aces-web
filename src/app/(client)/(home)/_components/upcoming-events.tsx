"use client";
import EventCard from "@/components/reusable/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import { handleGetUpcomingEventsService } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Section from "./section";

const UpcomingEvents = () => {
  const {
    data: upcomingEvents,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: handleGetUpcomingEventsService,
  });

  if (
    isError ||
    (!isLoading && (!upcomingEvents || upcomingEvents?.length === 0))
  ) {
    return null;
  }
  return (
    <Section id="upcoming-events" title="Upcoming Events">
      <div className="w-full overflow-hidden">
        <div className="flex gap-6 w-full overflow-x-auto snap-x snap-mandatory">
          {isLoading ? (
            <>
              <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
              <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
              <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
              <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
            </>
          ) : (
            upcomingEvents?.map((event, i) => (
              <div key={i} className="w-[80%] snap-center max-w-[380px]">
                <EventCard {...event} />
              </div>
            ))
          )}
        </div>
      </div>
    </Section>
  );
};

export default UpcomingEvents;
