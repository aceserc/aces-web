"use server";

import { notion } from "@/lib/notion";
import { parseNotionProperties } from "@/lib/parse-notion-properties";
import { PageObjectResponse } from "@notionhq/client";

export async function listAllSponsors() {
  const dbId = process.env.NOTION_SPONSORS_DATABASE_ID;

  if (!dbId) {
    throw new Error("Sponsors Database ID not found");
  }

  const response = await notion.databases.query({
    database_id: dbId,
  });

  const results = response.results.filter(
    (result): result is PageObjectResponse => result.object === "page"
  );

  const sponsors = await Promise.all(
    results.map((result) => {
      return parseNotionProperties<{
        name: string;
        website: string;
        logo: string;
      }>(result, {
        name: "title",
        website: "url",
        logo: "files",
      });
    })
  );

  return sponsors;
}
