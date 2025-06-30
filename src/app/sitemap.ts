import { COLLECTIONS } from "@/lib/db";
import { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const URL = process.env.NEXT_PUBLIC_SELF_URL;

  const urls = [
    "/",
    "/about",
    "/committee",
    "/contact",
    "/events",
    "/gallery",
    "/notices",
    "/training-and-workshops",
  ];

  urls.push(
    ...COLLECTIONS.events.map((c) => `/events/${c.slug}`),
    ...COLLECTIONS.notices.map((c) => `/notices/${c.slug}`),
    ...COLLECTIONS.trainings.map((c) => `/training-and-workshops/${c.slug}`)
  );

  const result: MetadataRoute.Sitemap = urls.map((url) => ({
    url: `${URL}${url}`,
    lastModified: new Date(),
    priority: 1.0,
    changeFrequency: "monthly",
  }));

  return result;
};

export default sitemap;

export const dynamic = "force-static";
