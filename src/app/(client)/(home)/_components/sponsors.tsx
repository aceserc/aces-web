import { ISponsorSchema } from "@/zod/sponsor.schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

type Props = {
  sponsors: ISponsorSchema[];
};

const Sponsors = async ({ sponsors }: Props) => {
  if (!sponsors || sponsors.length === 0) {
    return null;
  }
  return (
    <div
      id="sponsors"
      className="flex flex-col gap-4 items-center justify-center wrapper min-h-16"
    >
      <h3 className="text-xl md:text-2xl font-bold">Trusted By</h3>
      <Marquee
        gradient={true}
        gradientWidth={80}
        autoFill={true}
        pauseOnHover={true}
        className="flex items-center justify-center"
      >
        {sponsors.map((sponsor, i) => (
          <Link href={sponsor.website ?? "#"} key={i} target="_blank">
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              height={60}
              width={60}
              className="mr-9 md:mr-20 object-contain object-center aspect-square"
            />
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default Sponsors;
