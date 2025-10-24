"use client";
import React from "react";
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
import { Images } from "./images";

export type ImageType = {
  url: string;
  tag: string;
};

type Props = {
  images: ImageType[];
};

const Gallery = ({ images }: Props) => {
  const [index, setIndex] = useState<number>(-1);

  return (
    <div className="container mt-16">
      <Images
        data={images}
        onClick={(currentIndex) => setIndex(currentIndex)}
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
        slides={
          images.map((image) => ({
            src: image?.url,
            title: image?.tag,
          }))!
        }
      />
    </div>
  );
};

export { Gallery };
