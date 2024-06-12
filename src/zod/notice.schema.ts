import {
  MARKDOWN_BODY_MIN_LENGTH,
  MAX_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_NAME,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import { z } from "zod";

export const BasicNoticeSchema = z.object({
  title: z.string().min(MIN_LENGTH_TITLE, "Title is too short"),
  metaDescription: z
    .string()
    .min(MIN_LENGTH_META_DESCRIPTION, "Meta description is too short")
    .max(MAX_LENGTH_META_DESCRIPTION, "Meta description is too long"),
});

export const NoticeSchema = BasicNoticeSchema.extend({
  body: z.string().min(MARKDOWN_BODY_MIN_LENGTH, "Body is too short"),
  images: z.array(z.string()).optional(),
  thumbnail: z.string().url({
    message: "Thumbnail must be a valid URL",
  }),
});

export type IBasicNoticeSchema = z.infer<typeof BasicNoticeSchema>;
export type INoticeSchema = z.infer<typeof NoticeSchema>;
