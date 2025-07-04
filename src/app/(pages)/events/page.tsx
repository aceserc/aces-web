import { EventCard } from "@/components/common/event-card";
import { MainLayout } from "@/components/layout/main-layout";
import { getCollection } from "@/lib/db";
import { Event } from "@/lib/db/types";
import { Metadata } from "next";

const Events = () => {
  const events = getCollection("events") as Event[]
  return (
    <MainLayout title="Events">
      <div className="grid grid-cols-1 mx-auto gap-6 mt-12 w-full sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {events?.length === 0 ? (
          <div className="text-center text-lg md:text-2xl mt-16  col-span-4 flex items-center justify-center w-full">
            <span> No events found</span>
          </div>
        ) : (
          events
            ?.map((event, i) => (
              <EventCard
                key={i}
                {...event}
              />
            ))
        )}
      </div>
    </MainLayout>
  );
};

export default Events;

export const metadata: Metadata = {
  title: "Events | ACES"
}