import type { Metadata } from "next";
import { getCollection } from "@/db";
import type { Gallery as GalleryType } from "@/db/types";
import { Gallery } from "./_components";

async function Page() {
  const images = getCollection("gallery") as GalleryType[];
  console.log(images);
  return (
    <Gallery
      images={images.flatMap((i) =>
        i.images.map((img) => ({
          url: img,
          tag: i.tag,
        })),
      )}
    />
  );
}

export default Page;

export const metadata: Metadata = {
  title: "Gallery | ACES",
};
