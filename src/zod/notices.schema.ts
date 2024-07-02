import {
  MARKDOWN_BODY_MIN_LENGTH,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import { z } from "zod";
import { FileSchema } from "./file.schema";

export const NoticesSchema = z.object({
  title: z.string().min(MIN_LENGTH_TITLE, "Title is too short"),
  images: z.array(FileSchema).optional(),
});

export const NoticesSchemaExtended = NoticesSchema.extend({
  body: z.string().min(MARKDOWN_BODY_MIN_LENGTH, "Body is too short"),
  thumbnail: FileSchema,
});

export type INoticesSchema = z.infer<typeof NoticesSchema>;
export type INoticesSchemaExtended = z.infer<typeof NoticesSchemaExtended>;
