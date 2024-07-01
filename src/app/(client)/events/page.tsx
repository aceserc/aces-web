"use client";
import MainLayout from "@/components/layouts/main-layout";
import EventCard from "@/components/reusable/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/use-fetch";
import API from "@/services";
import { IEventsSchemaResponse } from "@/services/events";
import { IApiResponse } from "@/types/response";
import React from "react";

type IEvents = IEventsSchemaResponse[];

const Events = () => {
  const {
    data: events,
    isLoading,
    isError,
  } = useFetch<
    IApiResponse<{
      events: IEvents;
    }>
  >(API.events);

  if (
    isError ||
    (!isLoading && (!events || events?.data?.events?.length === 0))
  ) {
    return null;
  }
  return (
    <MainLayout title="Events">
      <div className="grid grid-cols-1 mx-auto gap-6 mt-12 w-full sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {isLoading ? (
          <>
            <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
            <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
            <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
            <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
          </>
        ) : (
          events?.data?.events?.map((event, i) => (
            <EventCard key={i} {...event} />
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default Events;
