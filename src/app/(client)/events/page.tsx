"use client";
import EventCard from "@/components/reusable/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/use-fetch";
import API from "@/services";
import { IEventsSchemaResponse } from "@/services/events";
import React from "react";

type IEvents = { data: IEventsSchemaResponse[] };

const Events = () => {
  const { data: events, isLoading, isError } = useFetch<IEvents>(API.events);

  if (isError || (!isLoading && (!events || events?.data?.length === 0))) {
    return null;
  }
  return (
    <div className="flex flex-col gap-12 items-center justify-center wrapper rounded-lg pt-16">
      <div className="flex flex-col items-center gap-2 justify-center ">
        <h3 className="text-xl md:text-2xl font-bold self-start">Events</h3>
        <hr className="w-1/2" />
      </div>
      <div className="flex mx-auto gap-6 flex-wrap justify-center xl:justify-normal w-full">
        {isLoading ? (
          <>
            <Skeleton className="w-full sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] rounded-md sm:min-w-[400px] md:min-w-[500px]" />
            <Skeleton className="w-full sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] rounded-md sm:min-w-[400px] md:min-w-[500px]" />
            <Skeleton className="w-full sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] rounded-md sm:min-w-[400px] md:min-w-[500px]" />
          </>
        ) : (
          events?.data.map((event, i) => <EventCard key={i} {...event} />)
        )}
      </div>
    </div>
  );
};

export default Events;
