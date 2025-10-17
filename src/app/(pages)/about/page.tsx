import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { CONTACT_LINKS } from "@/constants/contact-links";
import { Hero } from "./_components/hero";
import { Hr } from "@/components/ui/separator";
import { WhatWeDo } from "./_components/what-we-do";

const AboutPage = () => {
  return (
    <div className="mt-6 sm:mt-20">
      <div className="container flex flex-col gap-12">
        <Hero />
        <Hr />
        <WhatWeDo />
      </div>
    </div>
  );
};

export default AboutPage;

export const metadata: Metadata = {
  title: "About | ACES",
};
