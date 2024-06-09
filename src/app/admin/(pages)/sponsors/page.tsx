"use client";
import SearchInput from "@/components/reusable/search-input";
import { useEffect, useState } from "react";
import AddSponsor from "./_components/add-sponsor";
import { useQuery } from "@tanstack/react-query";
import { handleGetSponsorsService } from "@/services/sponsors";
import { ISponsorSchema } from "@/zod/sponsor.schema";
import Loading from "@/components/reusable/loading";
import search from "@/helpers/search";
import SponsorCard from "./_components/sponsor-card";

const SponsorsPage = () => {
  const [queryParam, setQueryParam] = useState("");
  const [filteredData, setFilteredData] = useState<ISponsorSchema[]>();
  const { data, isLoading } = useQuery<ISponsorSchema[]>({
    queryKey: ["sponsors"],
    queryFn: handleGetSponsorsService,
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
              placeholder="Search by name..."
              onChange={(e) => {
                setQueryParam(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <AddSponsor />
          </div>
        </div>
        {/*  sponsor list */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loading />
          </div>
        ) : filteredData && filteredData.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {filteredData.map((sponsor) => (
              <SponsorCard key={sponsor._id} {...sponsor} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <span className="text-muted-foreground">No sponsors found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorsPage;
