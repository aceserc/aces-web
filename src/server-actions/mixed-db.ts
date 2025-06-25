"use server";
import { notion } from "@/lib/notion";
import { parseNotionProperties } from "@/lib/parse-notion-properties";
import { PageObjectResponse } from "@notionhq/client";

export const getMixedDatabase = async () => {
  const databaseId = process.env.NOTION_MIXED_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Mixed Database ID not found");
  }

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const results = response.results.filter(
    (result): result is PageObjectResponse => result.object === "page"
  );

  const kv = await Promise.all(
    results.map((result) => {
      return parseNotionProperties<{ key: string; value: string }>(result, {
        key: "title",
        value: "rich_text",
      });
    })
  );

  return Object.fromEntries(kv.map((entry) => [entry.key, entry.value]));
};
