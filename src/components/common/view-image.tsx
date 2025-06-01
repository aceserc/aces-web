"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { cn } from "@/lib/utils";

type ViewImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
}

const ViewImage: React.FC<ViewImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const [index, setIndex] = useState<number>(-1);
  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setIndex(1)}
        {...props}
        className={cn("cursor-zoom-in", className)}
      />

      <Lightbox
        plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
        captions={{
          showToggle: true,
          descriptionTextAlign: "end",
        }}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={[
          {
            src: src!,
            title: alt,
          },
        ]}
      />
    </>
  );
};

export default ViewImage;