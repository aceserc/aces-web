import { getCollection } from "@/lib/db";
import { Gallery } from "./_components";
import { Gallery as GalleryType } from "@/lib/db/types";

async function Page() {
  const images = getCollection("gallery") as GalleryType[]
  console.log(images)
  return (
    <Gallery images={images.flatMap(i => i.images.map((img) => ({
      url: img,
      tag: i.tag,
    })))} />

  );
}

export default Page;