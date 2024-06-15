"use client";
import { cn } from "@/helpers/cn";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface ImageViewerProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const ImageViewer: React.FC<ImageViewerProps> = ({ className, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img
        onClick={() => setIsOpen(true)}
        className={cn("cursor-pointer", className)}
        {...rest}
      />
      <div
        style={{
          scale: isOpen ? 1 : 0,
        }}
        onClick={() => setIsOpen(false)}
        className="fixed select-none transition-transform overflow-hidden h-screen w-screen inset-0 bg-black bg-opacity-70 z-50 backdrop-blur-sm"
      >
        {/* close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-background"
        >
          <RxCross2 className="h-8 xl:h-12 xl:w-12 w-8" />
        </button>
        <img
          src={rest.src}
          alt={rest.alt}
          className="object-contain w-full h-full max-w-6xl m-auto object-center rounded-md p-6"
        />
      </div>
    </>
  );
};

export default ImageViewer;
