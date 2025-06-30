import { MainLayout } from "@/components/layout/main-layout";
import { MemberCard } from "./_components/member-card";
import { getCollection } from "@/lib/db";
import { Committee } from "@/lib/db/types"
const CommitteePage = () => {
  const members = getCollection("committee") as Committee[]

  let highestCommittee = 0;

  // group members by committee
  const committees = members.reduce((acc, member) => {
    const committee = Number(member.committee);
    if (!acc[committee]) {
      acc[committee] = [];
    }
    acc[committee].push(member);

    if (committee > highestCommittee) {
      highestCommittee = committee;
    }

    return acc;
  }, {} as Record<number, Committee[]>);

  // sort by weight lowest at top
  const currentCommittee = committees[highestCommittee].sort((a, b) => a.weight - b.weight)
  const president = currentCommittee.find(member => member.role.toLowerCase() === "president")
  const adviser = currentCommittee.find(member => member.role.toLowerCase() === "adviser")
  const restMembers = currentCommittee.filter(member => member.role.toLowerCase() !== "president" && member.role.toLowerCase() !== "adviser")

  return (
    <MainLayout
      title={
        <>
          ACES {highestCommittee}<sup>th</sup> Committee
        </>
      }
      headingClassName="sm:text-center"
    >
      <div className="flex gap-4 xs:gap-9 flex-col w-full mt-12 ">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 max-w-[700px] m-auto w-full">
          {president && (
            <MemberCard  {...president} />
          )}
          {adviser && (
            <MemberCard
              {...adviser}
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {(restMembers)?.map((member, i) => (
            <MemberCard
              key={i}
              {...member}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CommitteePage;
