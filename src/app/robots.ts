import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${process.env.NEXT_PUBLIC_SELF_URL}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SELF_URL,
  };
}

export const dynamic = "force-static";
