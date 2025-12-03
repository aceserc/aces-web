import type { FC } from "react";
import { structureGalleryImages } from "@/lib/structure-gallery-images";
import type { ImageType } from ".";
import { Gallery } from "./gallery";

interface ImagesProps {
  data: ImageType[];
  onClick: (index: number) => void;
}

const Images: FC<ImagesProps> = (props) => {
  const { data, onClick } = props;

  const handleClickImage = (index: number) => {
    onClick(index);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-9">
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

export { Images };
