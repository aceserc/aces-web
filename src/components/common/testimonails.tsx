import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Section } from "../ui/section";
import { listAllTestimonials } from "@/server-actions/testimonials";
import { TestimonialItem } from "./testimonial-item";

const Testimonials = async () => {
  const data = await listAllTestimonials();
  if (!data || data.length === 0) return null;
  return (
    <>
      <Section id="testimonials" title="What others say about us?">
        <Carousel className="w-full flex flex-col gap-4">
          <CarouselContent className="p-2 gap-x-2 md:gap-x-4">
            {data?.map((t, i) => (
              <TestimonialItem key={i} t={t} />
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

export { Testimonials };

