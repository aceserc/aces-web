import { Hexagon } from "lucide-react";
import { H2, H3, Paragraph } from "@/components/ui/typography";
import { WHAT_WE_DO } from "@/constants/about";

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
