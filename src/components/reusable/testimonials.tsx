import { getAllTestimonials } from "@/services/testimonials";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { cn } from "@/helpers/cn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Section from "./section";
import Image from "next/image";

const Testimonials = async () => {
  const data = await getAllTestimonials();

  if (!data || data.length === 0) return null;
  return (
    <>
      <Section id="testimonials" title="What others say about us?">
        <Carousel className="w-full flex flex-col gap-4">
          <CarouselContent className="p-2 gap-x-2 md:gap-x-4">
            {data?.map((t, i) => (
              <CarouselItem key={i} className="max-w-fit h-full">
                <div className="relative rounded-lg h-full shadow max-w-sm px-8 py-4 md:px-10 md:py-10 bg-white leading-snug gap-4 flex flex-col justify-between">
                  <div className="-ml-4">
                    <FaQuoteLeft className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="mt-2 text-sm sm:text-base">
                    <span className="text-gray-700">
                      {t.body.length > 150
                        ? t.body.slice(0, 150) + "..."
                        : t.body}
                    </span>
                    {t.body.length > 150 && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-blue-600 underline opacity-85 ml-1 text-sm">
                            Read more
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2.5">
                              <div>
                                <Image
                                  alt=""
                                  height={48}
                                  width={48}
                                  quality={100}
                                  className="w-12 h-12 rounded-full border border-primary/40 object-cover object-center"
                                  src={t.endorserAvatar?.url || ""}
                                />
                              </div>
                              <div className="flex flex-col gap-1.5 items-center">
                                <Link
                                  href={t.endorserContactUrl ?? "#"}
                                  className="underline"
                                  target="_blank"
                                >
                                  {t.endorserName}
                                </Link>
                                <DialogDescription className="ml-2">
                                  {t.endorserPosition}
                                </DialogDescription>
                              </div>
                            </DialogTitle>
                          </DialogHeader>
                          <p className="text-sm sm:text-base text-gray-700">
                            {t.body}
                          </p>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  <div className="end">
                    <div className="mx-auto w-full border border-gray-300 my-4" />
                    <div className="flex items-center">
                      <div>
                        <Image
                          alt=""
                          height={48}
                          width={48}
                          quality={100}
                          className="w-9 h-9 md:w-12 md:h-12 rounded-full border border-primary/40 object-cover object-center"
                          src={t.endorserAvatar?.url ?? ""}
                        />
                      </div>
                      <div className="ml-4">
                        <Link
                          href={t.endorserContactUrl ?? "#"}
                          target="_blank"
                          className={cn(
                            "font-medium text-sm md:text-base",
                            t.endorserContactUrl && "underline"
                          )}
                        >
                          {t.endorserName}
                        </Link>
                        <div className="text-xs sm:text-sm text-gray-600 mt-1">
                          {t.endorserPosition}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex gap-4 ml-auto">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </Section>
    </>
  );
};

export default Testimonials;
