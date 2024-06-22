import {
  MARKDOWN_BODY_MIN_LENGTH,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import { z } from "zod";

export const NoticesSchema = z.object({
  title: z.string().min(MIN_LENGTH_TITLE, "Title is too short"),
  images: z.array(z.string().url("Images contains invalid URL")).optional(),
});

export const NoticesSchemaExtended = NoticesSchema.extend({
  body: z.string().min(MARKDOWN_BODY_MIN_LENGTH, "Body is too short"),
  thumbnail: z.string().url("Thumbnail is not a valid URL"),
});

export type INoticesSchema = z.infer<typeof NoticesSchema>;
export type INoticesSchemaExtended = z.infer<typeof NoticesSchemaExtended>;
