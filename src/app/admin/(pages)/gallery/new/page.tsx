"use client";
import React, { useRef, useState } from "react";
import EnterMoreDetails from "./_components/enter-more-details";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { MAX_FILE_SIZE_IN_BYTES } from "@/constants/size.constant";
import { toast } from "sonner";

const NewImages = () => {
  const [images, setImages] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="overflow-x-scroll scrollbar-hidden min-h-[40vh] pb-40">
      <div className="border border-accent-foreground/10 rounded-lg bg-muted/10 p-6 flex flex-col gap-12 min-w-[1100px]">
        <div className="flex flex-col gap-4">
          <div>
            <Button
              onClick={() => inputRef?.current?.click()}
              className="flex items-center justify-center gap-2 ml-auto"
            >
              <span>Add images</span>
              <GoPlus className="w-5 h-5" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {images.length === 0 ? (
              <div className="flex flex-col items-center col-span-4 justify-center h-64">
                <span>Select at least one image!</span>
              </div>
            ) : (
              images.map((i, index) => (
                <div key={index} className="w-full h-fit relative group">
                  <button
                    onClick={() => {
                      // filter this image
                      setImages(
                        images.filter((_, imgIndex) => imgIndex !== index)
                      );
                    }}
                    className="absolute -top-2 z-20 -right-2 p-1 bg-red-500 rounded-full scale-0 group-hover:scale-100 transition-transform"
                  >
                    <MdDeleteOutline className="text-white h-5 w-5" />
                  </button>
                  <img
                    src={URL.createObjectURL(i)}
                    className="h-52 w-full object-cover object-center border border-gray-200 shadow-inner rounded-lg"
                  />
                </div>
              ))
            )}
          </div>
          <EnterMoreDetails
            images={images}
            disableTrigger={images.length === 0}
          />
          <input
            ref={inputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const images = Array.from(e.target.files || []);
                const newImages = images.filter(
                  (image) => image.size <= MAX_FILE_SIZE_IN_BYTES
                );
                if (images.length > newImages.length) {
                  toast.error(
                    `${
                      images.length - newImages.length
                    } images filtered due to the size limit, Please upload images with size less than ${
                      MAX_FILE_SIZE_IN_BYTES / 1024 / 1024
                    }MB`
                  );
                }
                setImages((prev) => [...newImages, ...prev]);
              }
            }}
            multiple
          />
        </div>
      </div>
    </div>
  );
};

export default NewImages;
