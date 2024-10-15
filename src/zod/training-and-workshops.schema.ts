import {
  MARKDOWN_BODY_MIN_LENGTH,
  MAX_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import { z } from "zod";
import { FileSchema } from "./file.schema";

export const TrainingAndWorkshopsSchema = z.object({
  title: z.string().min(MIN_LENGTH_TITLE, "Title is too short"),
  images: z.array(FileSchema).optional(),
  inShort: z
    .string()
    .min(MIN_LENGTH_META_DESCRIPTION, "Description is too short")
    .max(MAX_LENGTH_META_DESCRIPTION, "Description is too long"),
  duration: z
    .string({
      message: "Enter duration like 1 day, 2 hours, etc.",
    })
    .optional(),
});

export const TrainingAndWorkshopsSchemaExtended =
  TrainingAndWorkshopsSchema.extend({
    body: z.string().min(MARKDOWN_BODY_MIN_LENGTH, "Body is too short"),
    thumbnail: FileSchema,
  });

export type ITrainingAndWorkshopsSchema = z.infer<
  typeof TrainingAndWorkshopsSchema
>;
export type ITrainingAndWorkshopsSchemaExtended = z.infer<
  typeof TrainingAndWorkshopsSchemaExtended
>;
