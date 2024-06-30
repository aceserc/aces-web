import { cn } from "@/helpers/cn";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  withImage?: boolean;
  image?: StaticImport;
  sectionClassName?: string;
  imageContainerClassName?: string;
  dir?: "normal" | "reverse";
};

const SectionLayout = (props: Props) => {
  const {
    children,
    title,
    subTitle,
    withImage = false,
    image,
    sectionClassName,
    dir = "normal",
    imageContainerClassName,
  } = props;

  return (
    <section
      className={twMerge(
        "wrapper flex flex-col items-center gap-6",
        !withImage && "justify-center",
        sectionClassName
      )}
    >
      {!withImage && (
        <div className="flex flex-col items-center justify-center gap-1">
          {subTitle && (
            <h3 className="text-sm sm:text-base xl:text-xl text-center text-red-500">
              {subTitle}
            </h3>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mb-1 md:mb-5">
              {title}
            </h2>
          )}
        </div>
      )}
      {withImage && image ? (
        <div
          className={twMerge(
            "flex gap-5 xl:gap-9 w-full",
            dir === "reverse" && "flex-row-reverse"
          )}
        >
          <div
            className={cn(
              "relative h-[500px] min-w-[400px] w-[500px] hidden lg:flex",
              imageContainerClassName
            )}
          >
            <Image
              src={image}
              className="h-full w-full object-center object-contain"
              alt=""
            />
          </div>
          <div className="flex-grow my-auto">
            <div className="flex flex-col gap-1">
              {subTitle && (
                <h3 className="text-sm sm:text-base xl:text-xl text-red-500">
                  {subTitle}
                </h3>
              )}
              {title && (
                <h2 className="text-2xl md:text-3xl xl:text-4xl mb-1 md:mb-3 xl:truncate">
                  {title}
                </h2>
              )}
            </div>
            {children}
          </div>
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export default SectionLayout;
