import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Section } from "@/components/ui/section";
import { EventCard } from "@/components/common/event-card";
import { getCollection } from "@/lib/db";
import { Event } from "@/lib/db/types";

const UpcomingEvents = () => {
  const events = getCollection("events") as Event[]

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <Section id="upcoming-events" title="Upcoming/Recent Events">
      <div className="w-full">
        <div className="flex gap-6 w-full">
          <Carousel className="w-full flex flex-col gap-4">
            <CarouselContent>
              {events?.slice(0, 4)
                ?.map((event, i) => (
                  <CarouselItem key={i} className="w-full max-w-[450px] py-2">
                    <EventCard {...event} />
                  </CarouselItem>
                ))}
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

export { UpcomingEvents };
