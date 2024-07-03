import { FC } from "react";
import Gallery from "./gallery";

import { IFile } from "@/zod/file.schema";

export interface IImage {
  src: string;
  title: string;
}

interface ImagesProps {
  data: IImage[];
  onClick: (index: number) => void;
}

const Images: FC<ImagesProps> = (props) => {
  const { data, onClick } = props;

  const handleClickImage = (index: number) => {
    onClick(index);
  };

  return (
    <div className="flex flex-col gap-9">
      {structureGalleryImages(data).map((slide, index) => {
        return (
          <Gallery
            key={index}
            layout={index % 2 === 0 ? "normal" : "reverse"}
            images={slide}
            currentIndex={index}
            onClick={handleClickImage}
          />
        );
      })}
    </div>
  );
};

export default Images;

const structureGalleryImages = (images: IImage[]) => {
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
