import { Committee as CommitteeType } from "@/db/types";
import React from "react";
import { MemberCard } from "./member-card";

type Props = {
  committee: CommitteeType[];
};

const Committee = ({ committee }: Props) => {
  const president = committee.find(
    (member) => member.role.toLowerCase() === "president"
  );
  const adviser = committee.find(
    (member) => member.role.toLowerCase() === "adviser"
  );
  const restMembers = committee.filter(
    (member) =>
      member.role.toLowerCase() !== "president" &&
      member.role.toLowerCase() !== "adviser"
  );

  return (
    <div className="flex gap-4 xs:gap-9 flex-col w-full">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 max-w-[700px] m-auto w-full">
        {president && <MemberCard {...president} />}
        {adviser && <MemberCard {...adviser} />}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {restMembers?.map((member, i) => (
          <MemberCard key={i} {...member} />
        ))}
      </div>
    </div>
  );
};

export { Committee };
