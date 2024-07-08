import { getSponsors } from "@/services/sponsors";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

const Sponsors = async () => {
  const sponsors = await getSponsors(false);

  if (!sponsors || sponsors.length === 0) {
    return null;
  }
  return (
    <section
      id="trusted-by"
      className="flex flex-col gap-4 items-center justify-center wrapper min-h-16"
    >
      <h3 className="text-xl md:text-2xl font-bold animate-in-from-bottom delay-500">
        Trusted By
      </h3>
      <div
        className="animate-in-from-bottom"
        style={{
          animationDelay: "600ms",
        }}
      >
        <Marquee
          gradient={true}
          gradientWidth={80}
          autoFill={true}
          pauseOnHover={true}
          gradientColor="#f6f8fb"
          className="flex items-center justify-center"
        >
          {sponsors.map((sponsor, i) => (
            <Link href={sponsor.website ?? "#"} key={i} target="_blank">
              <img
                src={sponsor.logo.url}
                alt={sponsor.name}
                className="mr-9 md:mr-20 object-contain object-center aspect-square h-16 md:h-20 rounded-md"
              />
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Sponsors;
