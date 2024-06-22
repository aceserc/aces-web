"use client";
import EventCard from "@/components/reusable/event-card";
import NoticeCard from "@/components/reusable/notice-card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/use-fetch";
import API from "@/services";
import { INoticesSchemaResponse } from "@/services/notice";
import React from "react";

type Notices = { data: INoticesSchemaResponse[] };

const Events = () => {
  const { data: notices, isLoading, isError } = useFetch<Notices>(API.notices);

  if (isError || (!isLoading && (!notices || notices?.data?.length === 0))) {
    return null;
  }
  return (
    <div className="flex flex-col gap-12 items-center justify-center wrapper rounded-lg pt-16">
      <div className="flex flex-col items-center gap-2 justify-center ">
        <h3 className="text-xl md:text-2xl font-bold self-start">Notices</h3>
        <hr className="w-1/2" />
      </div>
      <div className="flex mx-auto gap-6 flex-wrap justify-center xl:justify-normal w-full">
        {isLoading ? (
          <>
            <Skeleton className="w-full min-w-full sm:min-w-[400px] sm:w-[400px] h-[300px] rounded-md" />
            <Skeleton className="w-full min-w-full sm:min-w-[400px] sm:w-[400px] h-[300px] rounded-md" />
            <Skeleton className="w-full min-w-full sm:min-w-[400px] sm:w-[400px] h-[300px] rounded-md" />
            <Skeleton className="w-full min-w-full sm:min-w-[400px] sm:w-[400px] h-[300px] rounded-md" />
          </>
        ) : (
          notices?.data.map((event, i) => <NoticeCard key={i} {...event} />)
        )}
      </div>
    </div>
  );
};

export default Events;
