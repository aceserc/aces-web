"use client";
import type { ImageType } from ".";
import { Image } from "./image";

type Props = {
  layout: "normal" | "reverse";
  images: ImageType[];
  onClick: (index: number) => void;
  currentIndex: number;
};

const Gallery = ({ images, onClick, currentIndex }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-9">
      {images.map((image, idx) => (
        <Image
          key={idx}
          src={image.url}
          title={image.title}
          index={idx}
          currentIndex={currentIndex}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export { Gallery };
