"use client";
import SearchInput from "@/components/reusable/search-input";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/reusable/loading";
import search from "@/helpers/search";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import {
  IEventsSchemaResponse,
  handleGetEventsService,
} from "@/services/events";
import EventCard from "@/components/reusable/event-card";
import AdminEventCard from "./_components/amin-event-card";

const NoticesPage = () => {
  const [queryParam, setQueryParam] = useState("");
  const [filteredData, setFilteredData] = useState<IEventsSchemaResponse[]>();
  const { data, isLoading } = useQuery<IEventsSchemaResponse[]>({
    queryKey: ["events"],
    queryFn: handleGetEventsService,
  });

  useEffect(() => {
    if (isLoading) return;
    const newData = search(data!, queryParam, ["name"]);
    setFilteredData(newData);
  }, [isLoading, data, queryParam]);

  return (
    <div className="overflow-x-scroll scrollbar-hidden min-h-[40vh] pb-40">
      <div className="border border-accent-foreground/10 rounded-lg bg-muted/10 p-6 flex flex-col gap-12 min-w-[1100px]">
        {/* top action buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <SearchInput
              placeholder="Search by title..."
              onChange={(e) => {
                setQueryParam(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/events/new">
              <Button className="flex items-center justify-center gap-2">
                <span>Add New Event</span>
                <GoPlus className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        {/*  event list */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loading />
          </div>
        ) : filteredData && filteredData.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {filteredData.map((event) => (
              <AdminEventCard key={event._id} {...event} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <span className="text-muted-foreground">No events found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticesPage;
