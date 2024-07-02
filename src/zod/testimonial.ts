import {
  MAX_LENGTH_NAME,
  MIN_LENGTH_CONTACT_BODY,
  MIN_LENGTH_NAME,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import { z } from "zod";
import { FileSchema } from "./file.schema";

export const TestimonialSchema = z.object({
  body: z.string().min(MIN_LENGTH_CONTACT_BODY, "Body is too short"),
  endorserContactUrl: z
    .string()
    .url("Contact URL is not a valid URL")
    .optional(),
  endorserName: z
    .string()
    .min(MIN_LENGTH_NAME, "Endorser name is too short")
    .max(MAX_LENGTH_NAME, "Endorser name is too long"),
  endorserPosition: z
    .string()
    .min(MIN_LENGTH_TITLE, "Endorser position is too short")
    .optional(),
  endorserAvatar: FileSchema.optional(),
});

export type ITestimonialSchema = z.infer<typeof TestimonialSchema>;
