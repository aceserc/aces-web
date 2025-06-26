import { listAllGalleryImages } from "@/server-actions/gallery";
import { Gallery } from "./_components";

async function Page() {
  const images = await listAllGalleryImages()
  console.log(images)
  return (
    <Gallery images={images.flatMap(i => i.images.map((img) => ({
      url: img,
      tag: i.tag,
    })))} />

  );
}

export default Page;