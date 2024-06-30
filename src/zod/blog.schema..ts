import {
  MARKDOWN_BODY_MIN_LENGTH,
  MAX_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string().min(MIN_LENGTH_TITLE, "Title is too short"),
  images: z.array(z.string().url("Images contains invalid URL")).optional(),
  metaDescription: z
    .string()
    .min(MIN_LENGTH_META_DESCRIPTION, "Meta description is too short")
    .max(MAX_LENGTH_META_DESCRIPTION, "Meta description is too long"),
});

export const BlogSchemaExtended = BlogSchema.extend({
  body: z.string().min(MARKDOWN_BODY_MIN_LENGTH, "Body is too short"),
  thumbnail: z.string().url("Thumbnail is not a valid URL"),
  tags: z.array(z.string()),
});

export type IBlogSchema = z.infer<typeof BlogSchema>;
export type IBlogSchemaExtended = z.infer<typeof BlogSchemaExtended>;
