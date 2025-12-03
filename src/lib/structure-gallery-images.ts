import type { ImageType } from "@/app/(pages)/gallery/_components";

export const structureGalleryImages = (images: ImageType[]) => {
  const galleryImages = [];

  // push each 4 images into a new array
  // then push the remaining images into a new array

  const imagesLength = images.length;
  const numberOfImages = Math.floor(imagesLength / 4);
  const remainingImages = imagesLength % 4;

  for (let i = 0; i < numberOfImages; i++) {
    const start = i * 4;
    const end = start + 4;
    galleryImages.push(images.slice(start, end));
  }
  if (remainingImages > 0) {
    galleryImages.push(images.slice(imagesLength - remainingImages));
  }
  return galleryImages;
};
