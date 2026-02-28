"use client";

import { Quote } from "lucide-react";
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
      className="container flex flex-col py-10 sm:py-24 items-center gap-3 justify-center"
    >
      <span className="text-center text-muted-foreground text-sm font-medium uppercase tracking-widest font-mono">
        Testimonials
      </span>
      <h3 className="text-center text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
        What others say about us?
      </h3>

      <div className="w-full max-w-7xl mt-14 relative">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, i) => (
              <CarouselItem
                key={i}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex flex-col bg-card p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full min-h-[280px] group">
                  <div className="p-2 rounded-lg bg-accent w-fit mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                    <Quote className="h-4 w-4 text-accent-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>

                  <p className="text-muted-foreground text-sm md:text-base mb-6 flex-grow line-clamp-6 leading-relaxed">
                    {testimonial.body}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      size="default"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export { Testimonials };
