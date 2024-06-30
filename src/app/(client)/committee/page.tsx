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
    <section className="wrapper flex items-center justify-center flex-col gap-9 sm:gap-12 mt-12 sm:mt-20">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        ACES 11<sup>th</sup> Committee
      </h1>
      <div className="flex gap-4 xs:gap-9 flex-col">
        <div className="flex gap-4 flex-col sm:flex-row items-center justify-center">
          {president && <MemberCard {...president} />}
          {adviser && <MemberCard {...adviser} />}
        </div>
        <div className="flex gap-4 flex-wrap items-center justify-center">
          {sortCommitteeMembers(restMembers)?.map((member) => (
            <MemberCard key={member._id} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitteePage;

const getMembers = async () => {
  const res = await fetchData<IApiResponse<ICommitteeSchemaWithAvatar[]>>(
    API.committee
  );
  return res?.data;
};
