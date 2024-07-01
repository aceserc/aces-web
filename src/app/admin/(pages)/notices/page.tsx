"use client";
import SearchInput from "@/components/reusable/search-input";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/reusable/loading";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
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
import {
  IHandleGetNoticesServiceResponse,
  INoticesSchemaResponse,
  handleGetNoticesService,
} from "@/services/notice";
import AdminNoticeCard from "./_components/amin-notice-card";
import { useUser } from "@clerk/nextjs";
import { ADMIN_ROLES } from "@/constants/roles.constants";

interface IDefaultQueryParam {
  page: number;
  sortBy: "startDate" | "endDate" | "createdAt" | "updatedAt" | "title";
  order: "asc" | "desc";
  search: string;
}

const NoticesPage = () => {
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

  const [filteredData, setFilteredData] = useState<INoticesSchemaResponse[]>();
  const { data, isLoading } = useQuery<IHandleGetNoticesServiceResponse>({
    queryKey: ["notices", queryParams],
    queryFn: () => handleGetNoticesService(queryParams),
  });

  useEffect(() => {
    if (isLoading) return;
    setFilteredData(data?.notices);
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

            {ADMIN_ROLES.includes(user?.publicMetadata.role as string) && (
              <Link href="/admin/notices/new" className="ml-5">
                <Button className="flex items-center justify-center gap-2">
                  <span>New Notice</span>
                  <GoPlus className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
        {/*  event list */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loading />
          </div>
        ) : filteredData && filteredData.length > 0 ? (
          <div className="grid mx-auto gap-6 grid-cols-3 w-full lg:max-w-[1100px] 2xl:grid-cols-4 2xl:max-w-[1500px]">
            {filteredData.map((notice) => (
              <AdminNoticeCard key={notice._id} {...notice} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <span className="text-muted-foreground">No notices found</span>
          </div>
        )}
        {!isLoading && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    queryParams.page === 1
                      ? "opacity-70 pointer-notices-none"
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
                      ? "opacity-70 pointer-notices-none"
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

export default NoticesPage;
