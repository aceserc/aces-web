import CommitteeMember from "@/components/reusable/committee-member";
import { ICommitteeSchemaWithAvatar } from "@/zod/committee.schema";
import React from "react";

type Props = ICommitteeSchemaWithAvatar;

const AdminCommitteeMember = (props: Props) => {
  return <CommitteeMember {...props} />;
};

export default AdminCommitteeMember;
