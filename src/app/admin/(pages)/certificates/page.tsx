"use client";
import SearchInput from "@/components/reusable/search-input";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/reusable/loading";
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
  IContactSchemaResponse,
  IHandleGetContactServiceResponse,
  handleGetAllContactService,
} from "@/services/contact";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { PlusIcon, UploadCloudIcon } from "lucide-react";
import AddCertificateModal from "./_components/add-certificate-modal";
import { toast } from "sonner";
import { CertificateSchemaForApi, ICertificateSchemaForApi } from "@/zod/certificate.schema";
import CertificatePreviewDialog from "./_components/certificate-preview";
import { handleGetTrainingsService, IHandleGetTrainingsServiceResponse } from "@/services/training-and-workshops";
import CertificateDetailsDialog from "./_components/view-certification-details";

interface IDefaultQueryParam {
  page: number;
  order: "asc" | "desc";
  search: string;
}

const ContactPage = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [certificateJsonData, setCertificateJsonData] = useState<ICertificateSchemaForApi>();
  const [isCertificatePreviewOpen, setIsCertificatePreviewOpen] = useState(false);

  const [queryParams, setQueryParams] = useState<IDefaultQueryParam>({
    page: 1,
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


  const { data, isLoading } = useQuery<IHandleGetTrainingsServiceResponse>({
    queryKey: ["training-and-workshops", {}],
    queryFn: () => handleGetTrainingsService({}),
  });


  return (
    <div className="overflow-x-scroll scrollbar-hidden min-h-[40vh] pb-40">
      <div className="border border-accent-foreground/10 rounded-lg bg-muted/10 p-6 flex flex-col gap-12 min-w-[1100px]">
        {/* top action buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <SearchInput
              placeholder="Search by event..."
              onChange={(e) => {
                debouncedSetQueryParams({ search: e.target.value });
              }}
            />
          </div>
          <div className="flex items-center gap-2">


            <Button
              onClick={() => {
                inputRef.current?.click();
              }}
              variant={"outline"}>
              <UploadCloudIcon />
            </Button>
            <input type="file"
              ref={inputRef}
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {

                  try {

                    const data = JSON.parse(reader.result as string);
                    const parsed = CertificateSchemaForApi.parse(data);
                    setCertificateJsonData(parsed);
                    setIsCertificatePreviewOpen(true);

                  }
                  catch (e) {
                    console.error(e);
                    toast.error("Invalid file format");
                  }

                };
                reader.readAsText(file);
              }}
            />

            {certificateJsonData && <CertificatePreviewDialog
              isOpen={isCertificatePreviewOpen}
              data={certificateJsonData}
              setIsOpen={setIsCertificatePreviewOpen}

            />}

            {/* <AddCertificateModal /> */}

          </div>
        </div>
        {/*  event list */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loading />
          </div>
        ) : data && data.trainings.length > 0 ? (
          <div className="flex flex-col border border-muted-foreground/30 rounded-md pb-3">
            <div
              style={{
                gridTemplateColumns: "0.2fr 2fr 2fr 0.8fr",
              }}
              className="grid gap-5 bg-muted px-5 py-3 rounded-t-md"
            >
              {["SN", "Name", "Created At", "Action"].map((item) => (
                <span key={item} className=" text-lg font-medium">
                  {item}
                </span>
              ))}
            </div>
            {data.trainings.map((tr, i) => (
              <div
                style={{
                  gridTemplateColumns: "0.2fr 2fr 2fr 0.8fr",
                }}
                key={tr._id}
                className={twMerge(
                  "grid gap-5 px-5 pt-3 text-muted-foreground",
                  i === data.trainings.length - 1 && "rounded-b-md"
                )}
              >
                {[
                  `${i + 1}.`,
                  tr.title,
                  new Date(tr.createdAt).toLocaleString(),
                  <CertificateDetailsDialog key={tr._id} eventId={tr._id} />,
                ].map((item, i) => (
                  <span
                    key={i} className="truncate">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <span className="text-muted-foreground">No contacts found</span>
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
