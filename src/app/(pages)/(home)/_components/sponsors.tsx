import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCollection } from "@/db";
import type { Sponsor } from "@/db/types";
import { cn } from "@/lib/utils";

const Sponsors = () => {
  const sponsors = getCollection("sponsors") as Sponsor[];
  if (!sponsors || sponsors.length === 0) return null;

  return (
    <section
      id="trusted-by"
      className="flex flex-col gap-4 items-center justify-center container min-h-16 py-8"
    >
      <h3 className="text-xl md:text-2xl font-bold">Trusted By</h3>

      <Marquee
        gradient
        gradientWidth={100}
        autoFill
        gradientColor="var(--background)"
        pauseOnHover
        className="flex items-center justify-center mt-4"
      >
        {[...sponsors, ...sponsors, ...sponsors].map((sponsor, i) => (
          <TooltipProvider key={i}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={sponsor.website ?? "#"}
                  target="_blank"
                  className={cn(
                    "mx-6 md:mx-8 flex items-center opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0",
                    !sponsor.website && "cursor-default pointer-events-none",
                  )}
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="object-contain object-center aspect-square h-15 md:h-15 xl:h-20 lg:h-18 w-auto rounded-md"
                    loading="lazy"
                    fetchPriority="low"
                    height={100}
                    width={100}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{sponsor.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </Marquee>
    </section>
  );
};

export { Sponsors };
