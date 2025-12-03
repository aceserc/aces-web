import { PageObjectResponse } from "@notionhq/client";

export type ParseNotionPropertiesSchema = {
  [key: string]:
    | PageObjectResponse["properties"][string]["type"]
    | "cover_image"
    | "id"
    | "files_array";
};

export const parseNotionProperties = async <T>(
  data: PageObjectResponse,
  schema: ParseNotionPropertiesSchema
) => {
  const result: { [key: string]: unknown } = {};

  for (const key in schema) {
    const type = schema[key];
    const property = data.properties[key];

    if (type === "id") {
      result[key] = data.id;
      continue;
    }

    if (type === "cover_image") {
      result[key] =
        data.cover?.type === "external"
          ? data.cover.external.url
          : data.cover?.file.url || "";
      continue;
    }

    if (!property) {
      console.log(`Property ${key} not found`);
      result[key] = "";
    } else {
      switch (type) {
        case "title":
          result[key] =
            property?.type === "title" && property.title[0]
              ? property.title[0].plain_text
              : "";
          break;

        case "rich_text":
          result[key] =
            property.type === "rich_text" && property.rich_text[0]
              ? property.rich_text[0].plain_text
              : "";
          break;

        case "url":
          result[key] = property.type === "url" ? property.url || "" : "";
          break;
        case "number":
          result[key] = property.type === "number" ? property.number : 0;
          break;

        case "email":
          result[key] = property.type === "email" ? property.email : "";
          break;

        case "files":
          result[key] =
            property.type === "files" && property.files[0]
              ? property.files[0].type === "file"
                ? property.files[0].file.url
                : property.files[0].type === "external"
                ? property.files[0].external.url
                : ""
              : "";
          break;

        case "files_array":
          const urls: string[] = [];
          if (property.type === "files") {
            property.files.forEach((file) => {
              if (file.type === "file") {
                urls.push(file.file.url);
              } else if (file.type === "external") {
                urls.push(file.external.url);
              }
            });
          }
          result[key] = urls;
          break;

        case "date":
          result[key] =
            property.type === "date" && property.date
              ? property.date.start || ""
              : "";
          break;

        case "select":
          result[key] =
            property.type === "select" && property.select
              ? property.select.name
              : "";
          break;

        case "created_time":
          result[key] = data.created_time;
          break;

        default:
          result[key] = "";
          break;
      }
    }
  }

  return result as T;
};
