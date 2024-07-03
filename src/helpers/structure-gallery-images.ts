import { IImage } from "@/app/(client)/gallery/_components/images";

export const structureGalleryImages = (images: IImage[]) => {
  let galleryImages = [];
  console.log(images);

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
  console.log(galleryImages);
  return galleryImages;
};
