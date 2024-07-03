import { IFile } from "@/zod/file.schema";
import React from "react";
import { IImage } from "./images";
import { cn } from "@/helpers/cn";
import { Badge } from "@/components/ui/badge";

type Props = {
  layout: "normal" | "reverse";
  images: IImage[];
  onClick: (index: number) => void;
  currentIndex: number;
};

const Gallery = ({ images, layout, currentIndex, onClick }: Props) => {
  const numberOfImages = images.length;

  if (numberOfImages === 1) {
    return (
      <>
        <div className="grid sm:hidden grid-cols-1 gap-6 h-[300px]">
          <Image
            src={images[0].src}
            title={images[0].title}
            onClick={onClick}
            currentIndex={currentIndex}
            index={0}
          />
        </div>
      </>
    );
  }

  if (numberOfImages === 2) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-[300px]">
          {["", ""].map((className, index) => (
            <Image
              key={index}
              src={images[index].src}
              title={images[index].title}
              onClick={onClick}
              currentIndex={currentIndex}
              index={index}
              className={className}
            />
          ))}
        </div>
      </>
    );
  }

  if (numberOfImages === 3) {
    return (
      <>
        <div className="hidden sm:grid grid-cols-2 grid-rows-2 gap-6 h-[500px]">
          {["row-span-2", "", "col-start-2 row-start-2"].map(
            (className, index) => (
              <Image
                key={index}
                src={images[index].src}
                title={images[index].title}
                onClick={onClick}
                currentIndex={currentIndex}
                index={index}
                className={className}
              />
            )
          )}
        </div>
        <div className="sm:hidden grid grid-cols-2 grid-rows-3 gap-6 h-[500px]">
          {["col-span-2 row-span-2", "row-start-3", "row-start-3"].map(
            (className, index) => (
              <Image
                key={index}
                src={images[index].src}
                title={images[index].title}
                onClick={onClick}
                currentIndex={currentIndex}
                index={index}
                className={className}
              />
            )
          )}
        </div>
      </>
    );
  }

  if (numberOfImages === 4) {
    return (
      <>
        {layout === "normal" ? (
          <div className={cn("hidden sm:grid grid-rows-3 gap-6 h-[500px]")}>
            {[
              "col-span-2 row-span-3",
              "col-span-2 row-span-2 col-start-3",
              "col-start-3 row-start-3",
              "col-start-4 row-start-3",
            ].map((className, index) => (
              <Image
                key={index}
                src={images[index].src}
                title={images[index].title}
                onClick={onClick}
                index={index}
                currentIndex={currentIndex}
                className={className}
              />
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "hidden sm:grid grid-cols-4 grid-rows-3 gap-6 h-[500px]"
            )}
          >
            {[
              "col-span-2 row-span-3 col-start-3 row-start-1",
              "col-span-2 row-span-2 col-start-1 row-start-1",
              "row-start-3",
              "row-start-3",
            ].map((className, index) => (
              <Image
                key={index}
                src={images[index].src}
                title={images[index].title}
                onClick={onClick}
                currentIndex={currentIndex}
                index={index}
                className={className}
              />
            ))}
          </div>
        )}

        <div className="sm:hidden grid grid-cols-2 grid-rows-4 gap-6 h-[500px]">
          {[
            "col-span-2 row-span-2",
            "col-span-2 row-start-3",
            "row-start-4",
            "row-start-4",
          ].map((className, index) => (
            <Image
              currentIndex={currentIndex}
              key={index}
              src={images[index].src}
              title={images[index].title}
              onClick={onClick}
              index={index}
              className={className}
            />
          ))}
        </div>
      </>
    );
  }
};

export default Gallery;

type ImageProps = {
  src: string;
  title: string;
  onClick: (index: number) => void;
  index: number;
  className?: string;
  currentIndex: number;
};

const Image = ({
  src,
  title,
  onClick,
  index,
  className,
  currentIndex,
}: ImageProps) => {
  return (
    <div
      onClick={() => onClick(index + currentIndex * 4)}
      role="button"
      className={cn(
        "rounded-md overflow-hidden flex items-center justify-center relative group",
        className
      )}
    >
      <Badge className="absolute top-2 left-2 scale-0 group-hover:scale-100 transition-all">
        {title}
      </Badge>
      <img
        src={src}
        alt={title}
        className="object-cover object-center w-full h-full rounded-md border border-gray-200 shadow-inner"
      />
    </div>
  );
};
