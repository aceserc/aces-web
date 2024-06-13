"use client";
import SearchInput from "@/components/reusable/search-input";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/reusable/loading";
import search from "@/helpers/search";
import AddMember from "./_components/add-member";
import { ICommitteeSchemaWithAvatar } from "@/zod/committee.schema";
import { handleGetCommitteesService } from "@/services/committee";
import AdminCommitteeMember from "./_components/admin-committee-member";

const CommitteesPage = () => {
  const [queryParam, setQueryParam] = useState("");
  const [filteredData, setFilteredData] =
    useState<ICommitteeSchemaWithAvatar[]>();

  const { data, isLoading } = useQuery<ICommitteeSchemaWithAvatar[]>({
    queryKey: ["committees"],
    queryFn: handleGetCommitteesService,
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
            <AddMember occupiedPosts={data?.map((c) => c.post) ?? []} />
          </div>
        </div>
        {/*  member list */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loading />
          </div>
        ) : filteredData && filteredData.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {filteredData.map((c) => (
              <AdminCommitteeMember key={c._id} {...c} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <span className="text-muted-foreground">No members found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommitteesPage;
