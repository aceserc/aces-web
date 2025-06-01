import { PageObjectResponse } from "@notionhq/client";
import { notionToMD } from "./notion";

type Schema = {
  [key: string]:
    | PageObjectResponse["properties"][string]["type"]
    | "cover_image"
    | "id"
    | "body";
};

export const parseNotionProperties = <T>(
  data: PageObjectResponse,
  schema: Schema
) => {
  const result: { [key: string]: unknown } = {};

  for (const key in schema) {
    const type = schema[key];
    const property = data.properties[key];

    if (!property) {
      result[key] = "";
    }

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

      case "cover_image":
        result[key] =
          data.cover?.type === "external"
            ? data.cover.external.url
            : data.cover?.file.url || "";
        break;
      case "id":
        result[key] = data.id;
        break;

      case "body":
        result[key] = notionToMD(data.id);
        break;

      case "created_time":
        result[key] = data.created_time;
        break;

      default:
        result[key] = "";
        break;
    }
  }

  return result as T;
};
