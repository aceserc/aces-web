import committee from "@/.generated/notion/committee.json";
import events from "@/.generated/notion/events.json";
import gallery from "@/.generated/notion/gallery.json";
import notices from "@/.generated/notion/notices.json";
import sponsors from "@/.generated/notion/sponsors.json";
import testimonials from "@/.generated/notion/testimonials.json";
import trainings from "@/.generated/notion/trainings.json";
import {
  Committee,
  Event,
  Gallery,
  Notice,
  Sponsor,
  Testimonial,
  Training,
} from "./types";

export const COLLECTIONS = {
  committee: committee as Committee[],
  events: events as Event[],
  gallery: gallery as Gallery[],
  notices: notices as Notice[],
  sponsors: sponsors as Sponsor[],
  testimonials: testimonials as Testimonial[],
  trainings: trainings as Training[],
};

type Collection = keyof typeof COLLECTIONS;

export const getCollection = (collection: Collection) => {
  return COLLECTIONS[collection];
};

export const getCollectionItemBySlug = (
  collection: Collection,
  slug: string
) => {
  return getCollection(collection).find((item) => {
    if ("slug" in item) {
      return item.slug === slug;
    }
    return undefined;
  });
};
