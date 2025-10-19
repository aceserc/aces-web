import { getCollection } from "@/db";
import { Committee } from "@/db/types";

const getCommittee = async () => {
  const members = getCollection("committee") as Committee[];
  const latestCommitteeNumber = Number(
    members.sort((a, b) => {
      return Number(b.committee) - Number(a.committee);
    })[0].committee
  );

  const groupedByCommittee: Record<number, Committee[]> = members.reduce(
    (acc, cur) => {
      const committeeNumber = Number(cur.committee);
      if (!acc[committeeNumber]) {
        acc[committeeNumber] = [];
      }
      acc[committeeNumber].push(cur);
      return acc;
    },
    {} as Record<number, Committee[]>
  );

  // largest at top
  const allCommitteesNumber = Object.keys(groupedByCommittee).map(Number);

  // also sort the committed members of each committee by weight
  allCommitteesNumber.forEach((committeeNumber) => {
    groupedByCommittee[committeeNumber] = groupedByCommittee[
      committeeNumber
    ].sort((a, b) => {
      return Number(a.weight) - Number(b.weight);
    });
  });

  const currentCommittee = groupedByCommittee[latestCommitteeNumber];

  return {
    currentCommittee,
    pastCommittees: groupedByCommittee,
    currentCommitteeNumber: latestCommitteeNumber,
  };
};

export { getCommittee };
