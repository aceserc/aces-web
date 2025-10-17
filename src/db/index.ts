import committee from "@/.generated/notion/committee.json";
import gallery from "@/.generated/notion/gallery.json";
import sponsors from "@/.generated/notion/sponsors.json";
import testimonials from "@/.generated/notion/testimonials.json";
import { Committee, Gallery, Sponsor, Testimonial } from "./types";

export const COLLECTIONS = {
  committee: committee as Committee[],
  gallery: gallery as Gallery[],
  sponsors: sponsors as Sponsor[],
  testimonials: testimonials as Testimonial[],
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
