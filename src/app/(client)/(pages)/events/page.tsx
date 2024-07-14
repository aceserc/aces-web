"use client";
import MainLayout from "@/components/layouts/main-layout";
import SomeErrorOccurred from "@/components/pages/some-error-occured";
import EventCard from "@/components/reusable/event-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { handleGetEventsService } from "@/services/events";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const Events = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: ({ pageParam }) =>
      handleGetEventsService({
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
    <MainLayout title="Events">
      <div className="grid grid-cols-1 mx-auto gap-6 mt-12 w-full sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {isLoading ? (
          <>
            <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
            <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
            <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
            <Skeleton className="w-full min-w-full h-[300px] rounded-md" />
          </>
        ) : data?.pages[0]?.events?.length === 0 ? (
          <div className="text-center text-lg md:text-2xl mt-16  col-span-4 flex items-center justify-center w-full">
            <span> No events found</span>
          </div>
        ) : (
          data?.pages
            .map((page) => page.events)
            .flat()
            ?.map((event, i) => (
              <EventCard
                className="animate-in-from-bottom"
                style={{
                  animationDelay: `${i * 50}ms`,
                }}
                key={i}
                {...event}
              />
            ))
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
