import {
  MAX_LENGTH_NAME,
  MIN_LENGTH_CONTACT_BODY,
  MIN_LENGTH_NAME,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(MIN_LENGTH_NAME, "Name is too short")
    .max(MAX_LENGTH_NAME, "Name is too long")
    .optional(),
  email: z.string().trim().email("Email is not a valid email").optional(),
  subject: z.string().trim().min(MIN_LENGTH_TITLE, "Subject is too short"),
  body: z.string().trim().min(MIN_LENGTH_CONTACT_BODY, "Body is too short"),
});
export type IContactSchema = z.infer<typeof ContactSchema>;
