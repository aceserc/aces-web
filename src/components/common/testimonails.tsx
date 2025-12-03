"use client";

import { Quote } from "lucide-react";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCollection } from "@/db";
import type { Testimonial } from "@/db/types";

const Testimonials = () => {
  const testimonials = getCollection("testimonials") as Testimonial[];

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="container flex flex-col py-8 sm:py-12 items-center gap-4 justify-center"
    >
      <h3 className="text-center text-xl sm:text-2xl lg:text-4xl font-bold">
        What others say about us?
      </h3>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-7xl mt-12"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial, i) => (
            <CarouselItem
              key={i}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="flex flex-col bg-card p-6 rounded-lg border border-border  h-full min-h-[280px]">
                <Quote className="h-6 w-6 text-primary mb-4" />
                <p className="text-muted-foreground text-sm md:text-base mb-6 flex-grow line-clamp-6">
                  {testimonial.body}
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    size="default"
                  />
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
};

export { Testimonials };
