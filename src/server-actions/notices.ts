import addRemoteImage from "@/lib/add-remote-image";
import { notion } from "@/lib/notion";
import { parseNotionProperties } from "@/lib/parse-notion-properties";
import { PageObjectResponse } from "@notionhq/client";

export async function listAllNotices() {
  const dbId = process.env.NOTION_NOTICES_DATABASE_ID;

  if (!dbId) {
    throw new Error("Notices Database ID not found");
  }

  const response = await notion.databases.query({
    database_id: dbId,
  });

  const results = response.results.filter(
    (result): result is PageObjectResponse => result.object === "page"
  );

  const notices = await Promise.all(
    results.map((result) => {
      return parseNotionProperties<Notice>(result, {
        title: "title",
        slug: "rich_text",
        cover_image: "cover_image",
        created_date: "created_time",
        id: "id",
      });
    })
  );

  const filtered = notices.filter((notice) => notice.slug);
  await addRemoteImage(filtered.map((f) => f.cover_image));
  return filtered;
}

export type Notice = {
  id: string;
  title: string;
  slug: string;
  cover_image: string;
  created_date: string;
};

export type NoticeWithBody = Notice & {
  body: string;
};

export const getNoticeBySlug = async (slug: string) => {
  const dbId = process.env.NOTION_NoticeS_DATABASE_ID;

  if (!dbId) {
    throw new Error("Notices Database ID not found");
  }

  const response = await notion.databases.query({
    database_id: dbId,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  const results = response.results.filter(
    (result): result is PageObjectResponse => result.object === "page"
  );

  if (results.length === 0) {
    return undefined;
  }

  const ev = results[0];

  if (!ev) {
    return undefined;
  }

  const res = await parseNotionProperties<Notice>(ev, {
    title: "title",
    slug: "rich_text",
    cover_image: "cover_image",
    created_date: "created_time",
    id: "id",
  });

  await addRemoteImage([res.cover_image]);
  return res;
};
