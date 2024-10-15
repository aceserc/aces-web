import MainLayout from "@/components/layouts/main-layout";
import MemberCard from "@/components/reusable/member-card";
import { sortCommitteeMembers } from "@/helpers/sort-committee-members";
import API from "@/services";
import { fetchData } from "@/services/fetch";
import { IApiResponse } from "@/types/response";
import { ICommitteeSchemaWithAvatar } from "@/zod/committee.schema";
import React from "react";

const CommitteePage = async () => {
  const members = await getMembers();
  const president = members?.find((m) => m.post === "President");
  const adviser = members?.find((m) => m.post === "Advisor");
  const restMembers = members?.filter(
    (m) => m.post !== "President" && m.post !== "Advisor"
  );
  return (
    <MainLayout
      title={
        <>
          ACES 11<sup>th</sup> Committee
        </>
      }
      headingClassName="sm:text-center"
    >
      <div className="flex gap-4 xs:gap-9 flex-col w-full mt-12 sm:mt-20">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 max-w-[700px] m-auto w-full">
          {president && (
            <MemberCard className="animate-in-from-bottom" {...president} />
          )}
          {adviser && (
            <MemberCard
              {...adviser}
              className="animate-in-from-bottom delay-75"
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {sortCommitteeMembers(restMembers)?.map((member, i) => (
            <MemberCard
              key={member._id}
              {...member}
              className="animate-in-from-bottom"
              style={{
                animationDelay: `${i * 50 + 75}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CommitteePage;

const getMembers = async () => {
  const res = await fetchData<IApiResponse<ICommitteeSchemaWithAvatar[]>>(
    API.committee
  );
  return res?.data;
};
