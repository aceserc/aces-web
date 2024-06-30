import { COMMITTEES_POST } from "@/constants/committees-post.constant";
import { ICommitteeSchemaWithAvatar } from "@/zod/committee.schema";

export const sortCommitteeMembers = (
  members: ICommitteeSchemaWithAvatar[] | undefined
) => {
  if (!members) return [];
  let sortedMembers: ICommitteeSchemaWithAvatar[] = [];
  COMMITTEES_POST.forEach((post) => {
    const membersWithPost = members.filter(
      (member) => member.post === post.post
    );
    sortedMembers = [...sortedMembers, ...membersWithPost];
  });

  return sortedMembers;
};
