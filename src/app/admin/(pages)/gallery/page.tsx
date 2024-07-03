"use client";
import SearchInput from "@/components/reusable/search-input";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/reusable/loading";
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

import {
  IHandleGetGalleryImagesService,
  handleGetGalleryImagesService,
} from "@/services/gallery";
import { ADMIN_ROLES } from "@/constants/roles.constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import ImageView from "./new/_components/image-view";
import { handleGetTags } from "@/services/tags";

interface IDefaultQueryParam {
  page: number;
  sortBy: "createdAt" | "tag";
  order: "asc" | "desc";
  search: string;
  tag: string;
}

const ContactPage = () => {
  const { user } = useUser();
  const [queryParams, setQueryParams] = useState<IDefaultQueryParam>({
    page: 1,
    sortBy: "createdAt",
    order: "desc",
    search: "",
    tag: "",
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
    useState<IHandleGetGalleryImagesService["images"]>();
  const { data, isLoading } = useQuery<IHandleGetGalleryImagesService>({
    queryKey: ["gallery", queryParams],
    queryFn: () => handleGetGalleryImagesService(queryParams),
  });

  const {
    data: suggestedTags,
    isLoading: isSuggestedTagsLoading,
    isError,
  } = useQuery({
    queryKey: ["tags", "gallery"],
    queryFn: () => handleGetTags("gallery"),
  });

  useEffect(() => {
    if (isLoading) return;
    setFilteredData(data?.images);
  }, [isLoading, data]);

  return (
    <div className="overflow-x-scroll scrollbar-hidden min-h-[40vh] pb-40">
      <div className="border border-accent-foreground/10 rounded-lg bg-muted/10 p-6 flex flex-col gap-12 min-w-[1100px]">
        {/* top action buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <SearchInput
              placeholder="Search by tag..."
              onChange={(e) => {
                debouncedSetQueryParams({ search: e.target.value, tag: "" });
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            {!isSuggestedTagsLoading && !isError && (
              <Select
                onValueChange={(value) =>
                  setQueryParams((prev) => ({
                    ...prev,
                    tag: value as IDefaultQueryParam["sortBy"],
                    search: "",
                  }))
                }
                value={queryParams.tag}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Tag" />
                </SelectTrigger>
                <SelectContent>
                  {suggestedTags?.tags?.map((item) => (
                    <SelectItem key={item} value={item}>
                      Tag: {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

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
                    label: "Tag",
                    value: "tag",
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
              <Link href="/admin/gallery/new" className="ml-5">
                <Button className="flex items-center justify-center gap-2">
                  <span>New images</span>
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
          <div className="grid grid-cols-6 gap-5">
            {filteredData.map((image, i) => (
              <ImageView key={i} {...image} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <span className="text-muted-foreground">No images found</span>
          </div>
        )}
        {!isLoading && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    queryParams.page === 1
                      ? "opacity-70 pointer-contacts-none"
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
                      ? "opacity-70 pointer-contacts-none"
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
