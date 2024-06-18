"use client";
import SearchInput from "@/components/reusable/search-input";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/reusable/loading";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import {
  IEventsSchemaResponse,
  handleGetEventsService,
} from "@/services/events";
import AdminEventCard from "./_components/amin-event-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import debounce from "@/helpers/debounce";

interface IDefaultQueryParam {
  page: number;
  sortBy: "startDate" | "endDate" | "createdAt" | "updatedAt" | "title";
  order: "asc" | "desc";
  search: string;
}

const NoticesPage = () => {
  const [queryParams, setQueryParams] = useState<IDefaultQueryParam>({
    page: 1,
    sortBy: "createdAt",
    order: "desc",
    search: "",
  });

  const debouncedSetQueryParams = useCallback(
    debounce((val: Partial<IDefaultQueryParam>) => {
      setQueryParams((prev) => ({
        ...prev,
        ...val,
      }));
    }),
    [] // dependencies
  ); //callback to ensure that setSearchParams is not called on every render

  const [filteredData, setFilteredData] = useState<IEventsSchemaResponse[]>();
  const { data, isLoading } = useQuery<IEventsSchemaResponse[]>({
    queryKey: ["events", queryParams],
    queryFn: () => handleGetEventsService(queryParams),
  });

  useEffect(() => {
    if (isLoading) return;
    setFilteredData(data);
  }, [isLoading, data]);

  return (
    <div className="overflow-x-scroll scrollbar-hidden min-h-[40vh] pb-40">
      <div className="border border-accent-foreground/10 rounded-lg bg-muted/10 p-6 flex flex-col gap-12 min-w-[1100px]">
        {/* top action buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <SearchInput
              placeholder="Search by title..."
              onChange={(e) => {
                debouncedSetQueryParams({ search: e.target.value });
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              onValueChange={(value) =>
                setQueryParams((prev) => ({
                  ...prev,
                  sortBy: value as IDefaultQueryParam["sortBy"],
                }))
              }
              value={queryParams.sortBy}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {[
                  {
                    label: "Created At",
                    value: "createdAt",
                  },
                  {
                    label: "Updated At",
                    value: "updatedAt",
                  },
                  {
                    label: "Start Date",
                    value: "startDate",
                  },
                  {
                    label: "End Date",
                    value: "endDate",
                  },
                  {
                    label: "Title",
                    value: "title",
                  },
                ].map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* sort by */}
            <Select
              onValueChange={(value) =>
                setQueryParams((prev) => ({
                  ...prev,
                  order: value as IDefaultQueryParam["order"],
                }))
              }
              value={queryParams.order}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                {[
                  {
                    label: "Ascending",
                    value: "asc",
                  },
                  {
                    label: "Descending",
                    value: "desc",
                  },
                ].map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Link href="/admin/events/new" className="ml-5">
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
