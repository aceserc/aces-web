import { FC } from "react";
import Gallery from "./gallery";
import { structureGalleryImages } from "@/helpers/structure-gallery-images";

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

export default Images;
