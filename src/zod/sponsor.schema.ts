import { MAX_LENGTH_NAME, MIN_LENGTH_NAME } from "@/constants/schema.constants";
import { z } from "zod";
import { FileSchema } from "./file.schema";

export const SponsorSchema = z.object({
  name: z
    .string()
    .min(MIN_LENGTH_NAME, "Too short!")
    .max(MAX_LENGTH_NAME, "Too long!"),
  logo: FileSchema,
  website: z.string().url("Invalid website URL").optional(),
  isActive: z.boolean().optional(),
});

export type ISponsorSchema = z.infer<typeof SponsorSchema> & {
  _id: string;
};
