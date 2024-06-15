import {
  MARKDOWN_BODY_MIN_LENGTH,
  MAX_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_META_DESCRIPTION,
  MIN_LENGTH_TITLE,
} from "@/constants/schema.constants";
import { z } from "zod";

export const EventsSchema = z.object({
  title: z.string().min(MIN_LENGTH_TITLE, "Title is too short"),
  images: z.array(z.string().url("Images is not a valid URL")).optional(),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().optional(),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().optional(),
  registrationLink: z.string().optional(),
});

export const EventsSchemaExtended = EventsSchema.extend({
  body: z.string().min(MARKDOWN_BODY_MIN_LENGTH, "Body is too short"),
  thumbnail: z.string().url("Thumbnail is not a valid URL"),
});

export type IEventsSchema = z.infer<typeof EventsSchema>;
export type IEventsSchemaExtended = z.infer<typeof EventsSchemaExtended>;
