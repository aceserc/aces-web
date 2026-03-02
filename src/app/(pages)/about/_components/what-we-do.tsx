import { Hexagon } from "lucide-react";
import { H2, H3, Paragraph } from "@/components/ui/typography";
import { WHAT_WE_DO } from "@/constants/about";

const WhatWeDo = () => {
  return (
    <section className="flex flex-col gap-4 items-center">
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest font-mono">
          Our Work
        </span>
        <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center">
          What we do?
        </H2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full mt-6">
        {WHAT_WE_DO.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-3 border border-dashed border-border rounded-xl px-6 py-8 cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative h-16 w-16 flex items-center justify-center shrink-0">
                <Hexagon className="h-full w-full text-primary opacity-10 stroke-1 group-hover:opacity-20 transition-opacity duration-300" />
                <Icon className="h-7 w-7 text-primary z-10 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <H3 className="text-center text-base font-semibold">
                {item.title}
              </H3>
              <Paragraph className="text-center text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </Paragraph>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { WhatWeDo };
