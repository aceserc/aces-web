"use client";

import MainLayout from "@/components/layouts/main-layout";
import SomeErrorOccurred from "@/components/pages/some-error-occured";
import NoticeCard from "@/components/reusable/notice-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { handleGetNoticesService } from "@/services/notice";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const Events = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["notices"],
    queryFn: ({ pageParam }) =>
      handleGetNoticesService({
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.resultsOnNextPage > 0) {
        return lastPage.pageNo + 1;
      }
      return undefined;
    },
  });

  if (isError) {
    return <SomeErrorOccurred />;
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
        ) : data?.pages[0]?.notices?.length === 0 ? (
          <div className="text-center text-lg md:text-2xl mt-16  col-span-4 flex items-center justify-center w-full">
            <span> No notices found</span>
          </div>
        ) : (
          data?.pages
            .map((page) => page.notices)
            .flat()
            .map((n, i) => <NoticeCard key={i} {...n} />)
        )}
      </div>
      {!isLoading && hasNextPage && (
        <div className="w-full flex items-center justify-center mt-9 sm:mt-12">
          <Button
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            variant="default"
          >
            Load More...
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default Events;
