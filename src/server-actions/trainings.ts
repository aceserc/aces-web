import addRemoteImage from "@/lib/add-remote-image";
import { notion } from "@/lib/notion";
import { parseNotionProperties } from "@/lib/parse-notion-properties";
import { PageObjectResponse } from "@notionhq/client";

export async function listAllTrainings() {
  const dbId = process.env.NOTION_TRAININGS_DATABASE_ID;

  if (!dbId) {
    throw new Error("Trainings Database ID not found");
  }

  const response = await notion.databases.query({
    database_id: dbId,
  });

  const results = response.results.filter(
    (result): result is PageObjectResponse => result.object === "page"
  );

  const trainings = await Promise.all(
    results.map((result) => {
      return parseNotionProperties<Training>(result, {
        title: "title",
        id: "id",
        description: "rich_text",
        created_at: "created_time",
        slug: "rich_text",
        thumbnail: "cover_image",
        duration: "rich_text",
      });
    })
  );

  const filtered = trainings.filter((training) => training.slug);

  await addRemoteImage(filtered.map((training) => training.thumbnail));

  return filtered;
}

export type Training = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  slug: string;
  thumbnail: string;
  duration: string;
};

export type TrainingWithBody = Training & {
  body: string;
};

export const getTrainingBySlug = async (slug: string) => {
  const dbId = process.env.NOTION_TRAININGS_DATABASE_ID;

  if (!dbId) {
    throw new Error("Trainings Database ID not found");
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

  const data = await parseNotionProperties<Training>(ev, {
    title: "title",
    id: "id",
    description: "rich_text",
    created_at: "created_time",
    slug: "rich_text",
    thumbnail: "cover_image",
    duration: "rich_text",
  });

  await addRemoteImage(data.thumbnail);
  return data;
};
