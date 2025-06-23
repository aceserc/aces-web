"use server";

import { notion } from "@/lib/notion";
import { parseNotionProperties } from "@/lib/parse-notion-properties";
import { PageObjectResponse } from "@notionhq/client";

export async function listAllTestimonials() {
  const dbId = process.env.NOTION_TESTIMONIALS_DATABASE_ID;

  if (!dbId) {
    throw new Error("NOTION_TESTIMONIALS_DATABASE_ID  not found");
  }

  const response = await notion.databases.query({
    database_id: dbId,
  });

  const results = response.results.filter(
    (result): result is PageObjectResponse => result.object === "page"
  );

  const testimonials = await Promise.all(
    results.map((result) => {
      return parseNotionProperties<Testimonial>(result, {
        name: "title",
        role: "rich_text",
        contact: "url",
        avatar: "files",
        id: "id",
      });
    })
  );

  return testimonials;
}

export type Testimonial = {
  name: string;
  role: string;
  contact: string;
  avatar: string;
  id: string;
};
