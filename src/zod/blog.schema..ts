import {
  MARKDOWN_BODY_MIN_LENGTH,
  MAX_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import { z } from "zod";
import { FileSchema } from "./file.schema";

export const BlogSchema = z.object({
  title: z.string().min(MIN_LENGTH_TITLE, "Title is too short"),
  images: z.array(FileSchema).optional(),
  metaDescription: z
    .string()
    .min(MIN_LENGTH_META_DESCRIPTION, "Meta description is too short")
    .max(MAX_LENGTH_META_DESCRIPTION, "Meta description is too long"),
});

export const BlogSchemaExtended = BlogSchema.extend({
  body: z.string().min(MARKDOWN_BODY_MIN_LENGTH, "Body is too short"),
  thumbnail: FileSchema,
  tags: z.array(z.string()),
});

export type IBlogSchema = z.infer<typeof BlogSchema>;
export type IBlogSchemaExtended = z.infer<typeof BlogSchemaExtended>;
