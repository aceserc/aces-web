import {
  MARKDOWN_BODY_MIN_LENGTH,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import { z } from "zod";
import { FileSchema } from "./file.schema";

export const EventsSchema = z.object({
  title: z.string().min(MIN_LENGTH_TITLE, "Title is too short"),
  images: z.array(FileSchema).optional(),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().optional(),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().optional(),
  registrationLink: z.string().optional(),
});

export const EventsSchemaExtended = EventsSchema.extend({
  body: z.string().min(MARKDOWN_BODY_MIN_LENGTH, "Body is too short"),
  thumbnail: FileSchema,
});

export type IEventsSchema = z.infer<typeof EventsSchema>;
export type IEventsSchemaExtended = z.infer<typeof EventsSchemaExtended>;
