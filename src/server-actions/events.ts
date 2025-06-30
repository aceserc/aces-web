import addRemoteImage from "@/lib/add-remote-image";
import { notion } from "@/lib/notion";
import { parseNotionProperties } from "@/lib/parse-notion-properties";
import { PageObjectResponse } from "@notionhq/client";

export async function listAllEvents() {
  const dbId = process.env.NOTION_EVENTS_DATABASE_ID;

  if (!dbId) {
    throw new Error("Events Database ID not found");
  }

  const response = await notion.databases.query({
    database_id: dbId,
  });

  const results = response.results.filter(
    (result): result is PageObjectResponse => result.object === "page"
  );

  const events = await Promise.all(
    results.map((result) => {
      return parseNotionProperties<Event>(result, {
        title: "title",
        location: "select",
        registration_url: "url",
        duration: "rich_text",
        event_date: "date",
        slug: "rich_text",
        cover_image: "cover_image",
        created_at: "created_time",
        id: "id",
      });
    })
  );

  const filteredEvents = events.filter((event) => event.slug);
  await addRemoteImage(filteredEvents.map((f) => f.cover_image));
  return filteredEvents;
}

export type Event = {
  id: string;
  title: string;
  location: string;
  registration_url: string;
  duration: string;
  event_date: string;
  slug: string;
  cover_image: string;
  created_at: string;
};

export type EventWithBody = Event & {
  body: string;
};

export const getEventBySlug = async (slug: string) => {
  const dbId = process.env.NOTION_EVENTS_DATABASE_ID;

  if (!dbId) {
    throw new Error("Events Database ID not found");
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

  const data = await parseNotionProperties<Event>(ev, {
    title: "title",
    location: "select",
    registration_url: "url",
    duration: "rich_text",
    event_date: "date",
    slug: "rich_text",
    cover_image: "cover_image",
    created_at: "created_time",
    id: "id",
  });

  await addRemoteImage([data.cover_image]);

  return data;
};
