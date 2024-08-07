import { MAX_LENGTH_NAME, MIN_LENGTH_NAME } from "@/constants/schema.constants";
import { z } from "zod";
import { FileSchema } from "./file.schema";

export const CommitteeSchema = z.object({
  name: z
    .string()
    .min(MIN_LENGTH_NAME, "Too short!")
    .max(MAX_LENGTH_NAME, "Too long!"),
  post: z.string(),
  socialLinks: z.array(z.string()).optional(),
});

export const CommitteeMemberSchemaWithAvatar = CommitteeSchema.extend({
  avatar: FileSchema,
});

export type ICommitteeSchema = z.infer<typeof CommitteeSchema> & {
  _id: string;
};

export type ICommitteeSchemaWithAvatar = z.infer<
  typeof CommitteeMemberSchemaWithAvatar
> & {
  _id: string;
};
