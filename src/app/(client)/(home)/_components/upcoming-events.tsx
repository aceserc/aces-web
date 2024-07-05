"use client";
import EventCard from "@/components/reusable/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import { handleGetUpcomingEventsService } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Section from "./section";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
        <div className="flex gap-6 w-full">
          <Carousel className="w-full flex flex-col gap-4">
            <CarouselContent>
              {isLoading ? (
                <>
                  <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
                  <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
                  <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
                  <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
                </>
              ) : (
                upcomingEvents?.map((event, i) => (
                  <CarouselItem key={i} className="w-full max-w-[380px]">
                    <EventCard {...event} />
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <div className="flex gap-4 ml-auto">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </Section>
  );
};

export default UpcomingEvents;
