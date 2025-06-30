import addRemoteImage from "@/lib/add-remote-image";
import { notion } from "@/lib/notion";
import { parseNotionProperties } from "@/lib/parse-notion-properties";
import { PageObjectResponse } from "@notionhq/client";

export async function listAllGalleryImages() {
  const dbId = process.env.NOTION_GALLERY_DATABASE_ID;

  if (!dbId) {
    throw new Error("Gallery Database ID not found");
  }

  const response = await notion.databases.query({
    database_id: dbId,
    sorts: [
      {
        property: "create_at",
        direction: "descending",
      },
    ],
  });

  const results = response.results.filter(
    (result): result is PageObjectResponse => result.object === "page"
  );

  const data = await Promise.all(
    results.map((result) => {
      return parseNotionProperties<{
        tag: string;
        created_at: string;
        images: string[];
      }>(result, {
        tag: "select",
        created_at: "date",
        images: "files_array",
      });
    })
  );

  await addRemoteImage(data.flatMap((d) => d.images));

  return data;
}
