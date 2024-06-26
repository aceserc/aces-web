"use client";

import MainLayout from "@/components/layouts/main-layout";
import NoticeCard from "@/components/reusable/notice-card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/use-fetch";
import API from "@/services";
import { INoticesSchemaResponse } from "@/services/notice";
import { IApiResponse } from "@/types/response";
import React from "react";

type INotices = INoticesSchemaResponse[];

const Events = () => {
  const {
    data: notices,
    isLoading,
    isError,
  } = useFetch<
    IApiResponse<{
      notices: INotices;
    }>
  >(API.notices);

  if (
    isError ||
    (!isLoading && (!notices || notices?.data?.notices?.length === 0))
  ) {
    return null;
  }
  return (
    <MainLayout title="Notices">
      <div className="grid grid-cols-1 mx-auto gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full mt-12 max-w-[750px] lg:max-w-[1100px] 2xl:grid-cols-4 2xl:max-w-[1500px]">
        {isLoading ? (
          <>
            <Skeleton className="xs:h-[386px] h-[300px]" />
            <Skeleton className="xs:h-[386px] h-[300px]" />
            <Skeleton className="xs:h-[386px] h-[300px]" />
            <Skeleton className="xs:h-[386px] h-[300px]" />
          </>
        ) : (
          notices?.data?.notices?.map((event, i) => (
            <NoticeCard key={i} {...event} />
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default Events;
