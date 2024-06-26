"use client";
import SearchInput from "@/components/reusable/search-input";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TestimonialAction from "./_components/testimonial-action";
import Loading from "@/components/reusable/loading";
import AddTestimonial from "./_components/add-testimonial";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import debounce from "@/helpers/debounce";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUser } from "@clerk/nextjs";
import { ADMIN_ROLES } from "@/constants/roles.constants";
import { twMerge } from "tailwind-merge";
import {
  IHandleGetTestimonialServiceResponse,
  ITestimonialSchemaResponse,
  handleGetAllTestimonialService,
} from "@/services/testimonials";

interface IDefaultQueryParam {
  page: number;
  sortBy: "createdAt" | "title";
  order: "asc" | "desc";
  search: string;
}

const ContactPage = () => {
  const { user } = useUser();
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

  const [filteredData, setFilteredData] =
    useState<ITestimonialSchemaResponse[]>();
  const { data, isLoading } = useQuery<IHandleGetTestimonialServiceResponse>({
    queryKey: ["testimonials", queryParams],
    queryFn: () => handleGetAllTestimonialService(queryParams),
  });

  useEffect(() => {
    if (isLoading) return;
    setFilteredData(data?.testimonials);
  }, [isLoading, data]);

  return (
    <div className="overflow-x-scroll scrollbar-hidden min-h-[40vh] pb-40">
      <div className="border border-accent-foreground/10 rounded-lg bg-muted/10 p-6 flex flex-col gap-12 min-w-[1100px]">
        {/* top action buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <SearchInput
              placeholder="Search by name..."
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
                    label: "Name",
                    value: "name",
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

            {ADMIN_ROLES.includes(user?.publicMetadata.role as string) && (
              <AddTestimonial />
            )}
          </div>
        </div>
        {/*  event list */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loading />
          </div>
        ) : filteredData && filteredData.length > 0 ? (
          <div className="flex flex-col border border-muted-foreground/30 rounded-md pb-3">
            <div
              style={{
                gridTemplateColumns: "0.2fr 2fr 2fr 5fr 1.5fr",
              }}
              className="grid gap-5 bg-muted px-5 py-3 rounded-t-md"
            >
              {["SN", "Name", "Created At", "Body", "Action"].map((item) => (
                <span key={item} className=" text-lg font-medium">
                  {item}
                </span>
              ))}
            </div>
            {filteredData.map((testimonials, i) => (
              <div
                style={{
                  gridTemplateColumns: "0.2fr 2fr 2fr 5fr 1.5fr",
                }}
                key={testimonials._id}
                className={twMerge(
                  "grid gap-5 px-5 pt-3 text-muted-foreground",
                  i === filteredData.length - 1 && "rounded-b-md"
                )}
              >
                {[
                  `${i + 1}.`,
                  testimonials.endorserName,
                  new Date(testimonials.createdAt).toLocaleString(),
                  testimonials.body,
                  <TestimonialAction
                    key="TestimonialAction"
                    {...testimonials}
                  />,
                ].map((item, i) => (
                  <span key={i} className="truncate">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <span className="text-muted-foreground">No testimonials found</span>
          </div>
        )}
        {!isLoading && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    queryParams.page === 1
                      ? "opacity-70 pointer-testimonialss-none"
                      : "cursor-pointer"
                  }
                  onClick={() => {
                    if (queryParams.page === 1) return;
                    setQueryParams((prev) => ({
                      ...prev,
                      page: prev.page - 1,
                    }));
                  }}
                />
              </PaginationItem>
              {Array.from(
                { length: data?.totalPages ?? 0 },
                (_, i) => i + 1
              ).map((page) => {
                if (page > 3) return null;

                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={queryParams.page === page}
                      onClick={() => {
                        setQueryParams((prev) => ({ ...prev, page }));
                      }}
                      className={
                        queryParams.page !== page ? "cursor-pointer" : ""
                      }
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              {data?.totalPages! > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  className={
                    data?.resultsOnNextPage! < 1
                      ? "opacity-70 pointer-testimonialss-none"
                      : "cursor-pointer"
                  }
                  onClick={() => {
                    if (data?.resultsOnNextPage! < 1) return;
                    setQueryParams((prev) => ({
                      ...prev,
                      page: prev.page + 1,
                    }));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
