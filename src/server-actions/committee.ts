import addRemoteImage from "@/lib/add-remote-image";
import { notion } from "@/lib/notion";
import { parseNotionProperties } from "@/lib/parse-notion-properties";
import { PageObjectResponse } from "@notionhq/client";

export async function listAllMembers() {
  const dbId = process.env.NOTION_COMMITTEE_DATABASE_ID;

  if (!dbId) {
    throw new Error("NOTION_COMMITTEE_DATABASE_ID not found");
  }

  const response = await notion.databases.query({
    database_id: dbId,
  });

  const results = response.results.filter(
    (result): result is PageObjectResponse => result.object === "page"
  );

  const members = await Promise.all(
    results.map((result) => {
      return parseNotionProperties<Member>(result, {
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
      });
    })
  );

  await addRemoteImage(
    members.map((m) => m.avatar).filter((a) => a !== undefined)
  );

  return members
    .filter((event) => event.committee)
    .map((c) => {
      //extract number using regex
      const parsedCommittee = c.committee.match(/\d+/);
      return {
        ...c,
        committee: parsedCommittee?.[0],
      };
    })
    .filter((c) => c.committee) as Member[];
}

export type Member = {
  name: string;
  role: string;
  avatar?: string;
  committee: string;
  weight: number;
  mail?: string;
  facebook?: string;
  linkedin?: string;
  external_link?: string;
};
