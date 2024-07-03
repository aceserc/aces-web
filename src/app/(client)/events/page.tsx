"use client";
import MainLayout from "@/components/layouts/main-layout";
import SomeErrorOccurred from "@/components/pages/some-error-occured";
import EventCard from "@/components/reusable/event-card";
import { Skeleton } from "@/components/ui/skeleton";
import { handleGetEventsService } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Events = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => handleGetEventsService(),
  });

  if (isError) {
    return <SomeErrorOccurred />;
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
        ) : data?.events?.length === 0 ? (
          <div className="text-center text-lg md:text-2xl mt-16  col-span-4 flex items-center justify-center w-full">
            <span> No events found</span>
          </div>
        ) : (
          data?.events?.map((event, i) => <EventCard key={i} {...event} />)
        )}
      </div>
    </MainLayout>
  );
};

export default Events;
