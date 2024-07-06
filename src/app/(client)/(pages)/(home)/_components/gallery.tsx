import React from "react";
import { fetchData } from "@/services/fetch";
import API from "@/services";
import Image from "next/image";
import Section from "@/components/reusable/section";

const Gallery = async () => {
  const data = await fetchData<{
    data: { images: { image: { url: string } }[] };
  }>(API.gallery);
  const images = data?.data?.images;

  if (!images) return null;
  if (images && images.length < 7) return null;
  return (
    <Section id="gallery" title="Gallery">
      <div className="hidden lg:grid grid-cols-6 grid-rows-6 gap-4 max-h-[600px] max-w-7xl">
        <div className="row-span-2 col-start-1 row-start-3">
          <Image
            src={images[0].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2 col-start-2 row-start-2">
          <Image
            src={images[1].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2 col-start-2 row-start-4">
          <Image
            src={images[2].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="col-span-2 row-span-6 col-start-3 row-start-1">
          <Image
            src={images[3].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2 col-start-5 row-start-2">
          <Image
            src={images[4].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2 col-start-5 row-start-4">
          <Image
            src={images[5].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2 col-start-6 row-start-3">
          <Image
            src={images[6].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
      </div>

      <div className="hidden sm:grid lg:hidden grid-cols-4 grid-rows-6 gap-4 max-h-[500px]">
        <div className="row-span-2 col-start-1 row-start-2">
          <Image
            src={images[0].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2 col-start-1 row-start-4">
          <Image
            src={images[1].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="col-span-2 row-span-6 col-start-2 row-start-1">
          <Image
            src={images[2].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2 col-start-4 row-start-2">
          <Image
            src={images[3].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2 col-start-4 row-start-4">
          <Image
            src={images[4].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
      </div>

      <div className="grid sm:hidden grid-cols-2 grid-rows-7 gap-2 max-h-[600px]">
        <div className="row-span-2">
          <Image
            src={images[0].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2">
          <Image
            src={images[1].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="col-span-2 row-span-3 row-start-3">
          <Image
            src={images[2].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2 col-start-2 row-start-6">
          <Image
            src={images[3].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
        <div className="row-span-2 col-start-1 row-start-6">
          <Image
            src={images[4].image.url}
            alt="gallery-image"
            height={500}
            width={500}
            quality={100}
            className="w-full h-full object-cover object-center rounded-xl border border-gray-300 shadow-inner"
          />
        </div>
      </div>
    </Section>
  );
};

export default Gallery;
