/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  parseNotionProperties,
  ParseNotionPropertiesSchema,
} from "@/lib/parse-notion-properties";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionConverter } from "notion-to-md";
import { DefaultExporter } from "notion-to-md/plugins/exporter";
import path from "path";
import fs from "fs";
import { config } from "dotenv";
import fetch from "node-fetch";
import { nanoid } from "nanoid";
config();

const URL_MAPS: Record<string, string> = {};

const notion = new Client({
  auth: process.env.NOTION_INTEGRATION_SECRET,
});

export const notionToMD = async (pageId: string, pathSuffix: string) => {
  try {
    // Create a NotionConverter instance
    const buffer: Record<string, string> = {};
    // Convert the page
    const exporter = new DefaultExporter({
      outputType: "buffer",
      buffer: buffer,
    });

    const n2m = new NotionConverter(notion)
      .withExporter(exporter)
      .uploadMediaUsing({
        async uploadHandler(url) {
          console.log("uploading", url);
          const response = await fetch(url);
          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // save file to local
          const fileName = path.basename(url)?.split("?")[0];
          const id = nanoid();
          const actualFilename = `${id}-${fileName}`;
          const actualPath = `/static/notion/${pathSuffix}`;

          // ensure directory exists
          if (!fs.existsSync(`./public${actualPath}`)) {
            fs.mkdirSync(`./public${actualPath}`, { recursive: true });
          }

          const filePath = path.join(`./public${actualPath}`, actualFilename);
          fs.writeFileSync(filePath, buffer);

          const returnPath = `${actualPath}/${actualFilename}`;
          URL_MAPS[url] = returnPath;
          return returnPath;
        },
        async cleanupHandler(entry) {
          if (entry.mediaInfo.uploadedUrl) {
            fs.unlinkSync(entry.mediaInfo.uploadedUrl);
          }
        },
      });
    // .downloadMediaTo({
    //   outputDir: `./public/static/notion/${pathSuffix}`,
    //   transformPath: (localPath) =>
    //     `/static/notion/${pathSuffix}/${path.basename(localPath)}`,
    //   preserveExternalUrls: false,
    // });

    const res = await n2m.convert(pageId);

    return {
      md: buffer[pageId],
      properties: res.blockTree.properties,
    };
  } catch (error) {
    console.error("Markdown conversion failed:", error);
    return {
      md: "",
      properties: [],
    };
  }
};

type Config = {
  dbId: string;
  id: string;
  schema: ParseNotionPropertiesSchema;
};

/**
 * Downloads and transforms URLs in parsed properties based on schema configuration
 */
const transformUrlsInParsedProperties = async (
  parsed: Record<string, any>,
  schema: ParseNotionPropertiesSchema,
  pathSuffix: string
): Promise<Record<string, any>> => {
  const result = { ...parsed };

  for (const [key, type] of Object.entries(schema)) {
    const value = result[key];

    // Only process cover_image, files, and files_array types
    if (type === "cover_image" || type === "files" || type === "files_array") {
      if (typeof value === "string" && value.startsWith("http")) {
        // Single URL (cover_image or single file)
        result[key] = await downloadAndTransformUrl(value, pathSuffix);
      } else if (Array.isArray(value)) {
        // Array of URLs (files_array)
        const transformedArray = [];
        for (const item of value) {
          if (typeof item === "string" && item.startsWith("http")) {
            transformedArray.push(
              await downloadAndTransformUrl(item, pathSuffix)
            );
          } else {
            transformedArray.push(item);
          }
        }
        result[key] = transformedArray;
      }
    }
  }

  return result;
};

/**
 * Downloads and transforms a single URL using the same logic as uploadHandler
 */
const downloadAndTransformUrl = async (
  url: string,
  pathSuffix: string
): Promise<string> => {
  if (!url || URL_MAPS[url]) {
    return URL_MAPS[url] || url;
  }

  try {
    console.log("downloading media from property:", url);
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = path.basename(url)?.split("?")[0];
    const id = nanoid();
    const actualFilename = `${id}-${fileName}`;
    const actualPath = `/static/notion/${pathSuffix}`;

    if (!fs.existsSync(`./public${actualPath}`)) {
      fs.mkdirSync(`./public${actualPath}`, { recursive: true });
    }

    const filePath = path.join(`./public${actualPath}`, actualFilename);
    fs.writeFileSync(filePath, buffer);

    const returnPath = `${actualPath}/${actualFilename}`;
    URL_MAPS[url] = returnPath;
    return returnPath;
  } catch (error) {
    console.error("Failed to download media from property:", error);
    return url;
  }
};

const CONFIG: Config[] = [
  {
    dbId: process.env.NOTION_SPONSORS_DATABASE_ID as string,
    id: "sponsors",
    schema: {
      name: "title",
      website: "url",
      logo: "files",
    },
  },
  {
    dbId: process.env.NOTION_EVENTS_DATABASE_ID as string,
    id: "events",
    schema: {
      title: "title",
      location: "select",
      registration_url: "url",
      duration: "rich_text",
      event_date: "date",
      slug: "rich_text",
      cover_image: "cover_image",
      created_at: "created_time",
      id: "id",
    },
  },
  {
    dbId: process.env.NOTION_TESTIMONIALS_DATABASE_ID as string,
    id: "testimonials",
    schema: {
      name: "title",
      role: "rich_text",
      contact: "url",
      avatar: "files",
      id: "id",
    },
  },
  {
    dbId: process.env.NOTION_TRAININGS_DATABASE_ID as string,
    id: "trainings",
    schema: {
      title: "title",
      id: "id",
      description: "rich_text",
      created_at: "created_time",
      slug: "rich_text",
      cover_image: "cover_image",
      duration: "rich_text",
    },
  },
  {
    dbId: process.env.NOTION_NOTICES_DATABASE_ID as string,
    id: "notices",
    schema: {
      title: "title",
      slug: "rich_text",
      cover_image: "cover_image",
      created_date: "created_time",
      id: "id",
    },
  },
  {
    dbId: process.env.NOTION_GALLERY_DATABASE_ID as string,
    id: "gallery",
    schema: {
      tag: "select",
      created_at: "date",
      images: "files_array",
    },
  },
  {
    dbId: process.env.NOTION_COMMITTEE_DATABASE_ID as string,
    id: "committee",
    schema: {
      name: "title",
      role: "select",
      avatar: "files",
      committee: "select",
      weight: "number",
      mail: "email",
      facebook: "url",
      linkedin: "url",
      external_link: "url",
      id: "id",
    },
  },
];

const main = async () => {
  // remove ./src/.generated/notion folder
  try {
    fs.rmSync(`./src/.generated/notion/`, { recursive: true });
  } catch {}
  try {
    fs.rmSync(`./public/static/notion`, { recursive: true });
  } catch {}

  for (const config of CONFIG) {
    const pages = await notion.databases.query({
      database_id: config.dbId,
    });

    const allPages = pages.results
      .filter((page): page is PageObjectResponse => page.object === "page")
      .filter((page) => page.id);

    const md: Record<string, string> = {};

    // Then in your main processing, replace the current URL mapping logic:
    const parsedProperties = await Promise.all(
      allPages.map(async (result) => {
        const res = await notionToMD(result.id, config.id);
        md[result.id] = res.md;

        console.log("result", JSON.stringify(result, null, 2));

        const parsed = (await parseNotionProperties(
          result,
          config.schema
        )) as Record<string, any>;

        // Transform URLs in parsed properties for cover_image, files, and files_array
        const transformedParsed = await transformUrlsInParsedProperties(
          parsed,
          config.schema,
          config.id
        );

        return transformedParsed;
      })
    );

    // save the json and markdown

    // ensure directory exists
    fs.mkdirSync(`./src/.generated/notion/`, { recursive: true });

    fs.writeFileSync(
      `./src/.generated/notion/${config.id}.json`,
      JSON.stringify(
        parsedProperties.map((page) => ({
          ...page,
          body: md[page.id],
        }))
      )
    );
  }
};

main();
