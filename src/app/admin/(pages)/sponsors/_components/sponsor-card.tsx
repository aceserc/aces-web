import { ISponsorSchema } from "@/zod/sponsor.schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = ISponsorSchema;

const SponsorCard = (props: Props) => {
  return (
    <Link
      href={props.website ?? "#"}
      className="bg-background shadow-md rounded-md p-3 hover:scale-105 transition-transform"
    >
      <Image
        src={props.logo}
        alt={props.name}
        width={100}
        height={100}
        className="object-center object-contain"
      />
    </Link>
  );
};

export default SponsorCard;
