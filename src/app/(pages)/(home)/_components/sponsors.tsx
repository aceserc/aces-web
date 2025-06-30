import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import Image from "next-export-optimize-images/image";
import { getCollection } from "@/lib/db";
import { Sponsor } from "@/lib/db/types";
const Sponsors = () => {
  const sponsors = getCollection("sponsors") as Sponsor[];
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  return (
    <section
      id="trusted-by"
      className="flex flex-col gap-4 items-center justify-center container min-h-16"
    >
      <h3 className="text-xl md:text-2xl font-bold">Trusted By</h3>
      <Marquee
        gradient={true}
        gradientWidth={80}
        autoFill={true}
        gradientColor="var(--background)"
        pauseOnHover={true}
        className="flex items-center justify-center mt-4"
      >
        {[...sponsors, ...sponsors, ...sponsors].map((sponsor, i) => (
          <TooltipProvider key={i}>
            <Tooltip
              delayDuration={0}
            >
              <TooltipTrigger>
                <Link href={sponsor.website ?? "#"} target="_blank" className={cn(!sponsor.website && "cursor-default pointer-events-none")}>
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="mx-4 md:mx-8 object-contain object-center aspect-square h-12 md:h-16 rounded-md"
                    loading="lazy"
                    fetchPriority="low"
                    height={100}
                    width={100}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {sponsor.name}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </Marquee>
    </section>
  );
};

export { Sponsors };