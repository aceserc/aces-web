import { NEXT_REVALIDATE_TIME } from "@/constants/time.constant";

export const fetchData = async <T>(url: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const data = await fetch(`${baseUrl}${url}`, {
    next: {
      revalidate: NEXT_REVALIDATE_TIME,
    },
  });
  const json = await data.json();
  return json?.data as T;
};
