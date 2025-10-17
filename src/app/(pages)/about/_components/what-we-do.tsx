import React from "react";

import {
  CalendarHeart,
  Hexagon,
  LaptopIcon,
  MicIcon,
  TrophyIcon,
} from "lucide-react";
import { H2, H3, Paragraph } from "@/components/ui/typography";

const WHAT_WE_DO = [
  {
    title: "Training",
    icon: LaptopIcon,
    description:
      "We provide training on various technologies and tools to help students gain practical knowledge and skills. Programs include web development, mobile app development, data science, and more.",
  },
  {
    title: "Competitions",
    icon: TrophyIcon,
    description:
      "We organize various competitions and events to help students showcase their skills and talents. This includes coding competitions, hackathons, and other events.",
  },
  {
    title: "Podcasts",
    icon: MicIcon,
    description:
      "We host podcasts and interviews with industry experts to help students learn from the best. Our podcasts cover a wide range of topics related to computer engineering and technology.",
  },
  {
    title: "Tech Fest",
    icon: CalendarHeart,
    description:
      "We organize an annual tech fest where students can showcase their projects and innovations. The tech fest is a platform for students to network with industry professionals and learn about the latest trends in technology.",
  },
];

const WhatWeDo = () => {
  return (
    <section className="flex flex-col gap-6 sm:gap-10  items-center">
      <H2 className="text-4xl">What we do?</H2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {WHAT_WE_DO.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 sm:gap-4 border border-muted-foreground/30 border-dashed rounded-md px-5 py-3 cursor-pointer hover:border-primary transition-all hover:border-dotted hover:shadow-xl "
            >
              <div className="relative h-20 w-20 flex items-center justify-center">
                <Hexagon className="h-full w-full text-destructive opacity-10 stroke-1" />
                <Icon className="h-9 w-9 text-primary z-10 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <H3 className="text-center">{item.title}</H3>
              <Paragraph className="text-center">{item.description}</Paragraph>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { WhatWeDo };
