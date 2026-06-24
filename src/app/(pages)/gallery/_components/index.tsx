"use client";
import { cn } from "@/lib/utils";
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
  title: string;
  categories: string;
};

type Props = {
  images: ImageType[];
};

const Gallery = ({ images }: Props) => {
  const [index, setIndex] = useState<number>(-1);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(images.map((img) => img.categories).filter(Boolean))),
  ];

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.categories === activeCategory);

  return (
    <div className="container mt-16">
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          // biome-ignore lint/a11y/useButtonType: <>
<button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setIndex(-1);
            }}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-muted-foreground border-muted hover:border-primary hover:text-primary",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <Images
        data={filteredImages}
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
          filteredImages.map((image) => ({
            src: image?.url,
            title: image?.title,
            description: image?.categories,
          })) || []
        }
      />
    </div>
  );
};

export { Gallery };
